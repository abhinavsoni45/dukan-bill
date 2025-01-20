import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BillsService } from './bills.service';
import { Bill } from './entities/bill.entity';
import { CreateBillInput } from './dto/create-bill.input';
import { UpdateBillInput } from './dto/update-bill.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';

@Resolver(() => Bill)
export class BillsResolver {
  constructor(private readonly billsService: BillsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bill)
  createBill(
    @Args('createBillInput') createBillInput: CreateBillInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.billsService.create(createBillInput, user._id);
  }

  @Query(() => [Bill], { name: 'bills' })
  // @UseGuards(GqlAuthGuard)
  findAll() {
    return this.billsService.findAll();
  }

  @Query(() => Bill, { name: 'bill' })
  // @UseGuards(GqlAuthGuard)
  findOne(@Args('_id') _id: string) {
    return this.billsService.findOne(_id);
  }

  // @Mutation(() => Bill)
  // // @UseGuards(GqlAuthGuard)
  // updateBill(
  //   @Args('updateBillInput') updateBillInput: UpdateBillInput,
  //   @CurrentUser() user: TokenPayload,
  // ) {
  //   return this.billsService.update(_id, updateBillInput, user._id);
  // }

  @Mutation(() => Bill)
  async updateBill(
    @Args('updateBillInput') updateBillInput: UpdateBillInput,
    @CurrentUser() user: TokenPayload,
  ) {
    console.log(
      updateBillInput,
      'updatedbillinput',
      updateBillInput._id,
      user,
      // user._id,
    );
    return this.billsService.update(
      updateBillInput._id,
      updateBillInput,
      // user._id,
    );
  }

  @Mutation(() => Bill)
  removeBill(@Args('_id') _id: string) {
    return this.billsService.remove(_id);
  }
}
