import { NextRequest, NextResponse } from 'next/server';
import { connectDB, uploadImageAndGetUrl, getDataFromToken, User } from '../../../../lib/paths';
import { MongoServerError } from 'mongodb';

connectDB();

export async function PATCH(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required. Token missing or invalid.' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const username = formData.get('username') as string | null;
    const profilePictureFile = formData.get('profilePicture') as File | null;

    console.log('update username', username, profilePictureFile)

    if (!username || typeof username !== 'string' || username.trim().length < 4) {
      return NextResponse.json({ error: 'Username must be at least 4 characters long.' }, { status: 400 });
    }

    const updateFields: { username: string; profilePicture?: string } = {
      username: username.trim(),
    };

    let newImageUrl: string | undefined;
    if (profilePictureFile) {
      newImageUrl = await uploadImageAndGetUrl(profilePictureFile);
      console.log('Cloudinary URL returned:', newImageUrl);
      if (!newImageUrl || typeof newImageUrl !== 'string') {
        throw new Error("Failed to get a valid URL from upload helper.");
      }

      updateFields.profilePicture = newImageUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select(
      'username profilePicture email isVerified -_id'
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log(updatedUser, 'updatedUser')

    return NextResponse.json(
      {
        message: 'ProfiLe updated successfully',
        isProfileUpdated: true,
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return NextResponse.json(
        { error: 'Username is already taken. Please choose another.' },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
