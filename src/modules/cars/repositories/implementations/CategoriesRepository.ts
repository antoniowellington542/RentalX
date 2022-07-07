import { Repository } from 'typeorm';

import AppDataSource from '../../../../database';
import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDto';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const categories = await this.repository.findOne({ where: { name } });
    return categories;
  }
}

export { CategoriesRepository };
