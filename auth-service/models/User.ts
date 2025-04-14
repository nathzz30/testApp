import {
    Table,
    Column,
    Model,
    DataType,
    BeforeCreate,
    BeforeUpdate,
  } from 'sequelize-typescript';
  import bcrypt from 'bcrypt';
  
  @Table({
    tableName: 'users',
    timestamps: true, // Adds createdAt and updatedAt
  })
  export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      })
    id!: number;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name!: string;
  
    @Column({
      type: DataType.STRING,
      unique: true,
      allowNull: false,
    })
    email!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    password!: string;
  
    // Hash password before saving to DB
    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(instance: User) {
      if (instance.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        instance.password = await bcrypt.hash(instance.password, salt);
      }
    }
  
    // Compare plaintext with hashed password
    async validatePassword(plaintext: string): Promise<boolean> {
      return bcrypt.compare(plaintext, this.password);
    }
  }
  