import { Injectable } from '@nestjs/common';
import { CreateBillInput } from './dto/create-bill.input';
import { UpdateBillInput } from './dto/update-bill.input';
import { BillsRepository } from './bills.repository';
import { Bill } from './entities/bill.entity';

@Injectable()
export class BillsService {
  constructor(private readonly billsRepository: BillsRepository) {}

  async create(createBillInput: CreateBillInput, userId: string) {
    return this.billsRepository.create({
      ...createBillInput,
      userId,
      // userIds: createBillInput.userIds || [],
    });
    // return this.billsRepository.create({ ...createBillInput, userId });
  }

  async findAll() {
    return this.billsRepository.find({});
  }

  async findOne(_id: string) {
    return this.billsRepository.findOne({ _id });
  }

  async update(_id: string, updateBillInput: UpdateBillInput) {
    return await this.billsRepository.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...updateBillInput, // Merge the update input
          // userId, // Explicitly update the userId field
        },
      },
      // { ...updateBillInput },
      // { _id },
      // {
      //   $set: {
      //     ...updateBillInput,
      //     userId, // Ensure the userId is included in the update operation
      //   },
      // },
    );
  }

  async remove(_id: string) {
    return this.billsRepository.findOneAndDelete({ _id });
  }
}
