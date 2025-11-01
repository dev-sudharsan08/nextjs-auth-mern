import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import Task from '@/models/taskModel';
import getDataFromToken from '@/helpers/getDataFromToken';

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required. Token missing or invalid.' },
        { status: 401 }
      );
    }

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { message: 'Authentication required. Token missing or invalid.' },
        { status: 401 }
      );
    }

    const reqBody = await request.json();
    const { title, description, status, priority, dueDate } = reqBody;

    const task = new Task({
      userId,
      title,
      description,
      status: status || 'To Do',
      priority: priority || 'Medium',
      dueDate: dueDate ? new Date(dueDate) : undefined
    });

    const savedTask = await task.save();
    return NextResponse.json({ task: savedTask }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
