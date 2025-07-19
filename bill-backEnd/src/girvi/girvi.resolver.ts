import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
// import { GirviService } from './girvi.service';
import { Girvi } from './entities/girvi.entity';
import { UpdateGirviInput } from './dto/update-girvi.input';
import { UseGuards } from '@nestjs/common';
// import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { GirviService } from './girvi.service';
import { CreateGirviInput } from './dto/create-girvi.input';
import { GirviFilterQuery } from './dto/girvi-query.input';
import { number } from 'joi';
import { SeriesRange } from './entities/seriesRange.type';

@Resolver(() => Girvi)
export class GirviResolver {
  constructor(private readonly girviService: GirviService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Girvi)
  createGirvi(
    @Args('createGirviInput') createGirviInput: CreateGirviInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.girviService.create(createGirviInput, user._id);
  }

  @Query(() => [Girvi], { name: 'girvis' })
  findAll(
    @Args('girviFilterQuery', { nullable: true })
    girviFilterQuery?: GirviFilterQuery,
  ) {
    return this.girviService.findAll(girviFilterQuery);
  }

  // @Query(() => Int, {
  //   nullable: true,
  //   name: 'findSeriesRange',
  // })
  // findSeriesRange() {
  //   return this.girviService.findSeriesRange();
  // }
  @Query(() => SeriesRange, { name: 'seriesRange' })
  findSeriesRange() {
    return this.girviService.findSeriesRange();
  }

  @Query(() => Girvi, { name: 'girvi' })
  findOne(@Args('_id') _id: string) {
    return this.girviService.findOne(_id);
  }

  @Mutation(() => Girvi)
  async updateGirvi(
    @Args('updateGirviInput') updateGirviInput: UpdateGirviInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.girviService.update(updateGirviInput._id, updateGirviInput);
  }

  @Mutation(() => Girvi)
  removeGirvi(@Args('_id') _id: string) {
    return this.girviService.remove(_id);
  }

  // @Mutation(() => [Girvi])
  // async bulkInsertGirvis(
  //   @Args({ name: 'girvis', type: () => [CreateGirviInput] })
  //   girvis: CreateGirviInput[],
  //   @CurrentUser() user: TokenPayload,
  // ) {
  //   return this.girviService.bulkInsert(girvis, user._id);
  // }

  // @Mutation(() => Boolean)
  // async uploadExcel(
  //   @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  //   @CurrentUser() user: TokenPayload,
  // ) {
  //   return this.girviService.saveExcelToTemp(file, user._id);
  // }
}
