import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import Task from '@/models/taskModel';
import getDataFromToken from '@/helpers/getDataFromToken';

connectDB();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getDataFromToken(request);
    const reqBody = await request.json();
    const { title, description, status, priority, dueDate } = reqBody;

    const task = await Task.findOneAndUpdate(
      { _id: params.id, userId },
      {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined
      },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ task }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getDataFromToken(request);

    const task = await Task.findOneAndDelete({ _id: params.id, userId });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
