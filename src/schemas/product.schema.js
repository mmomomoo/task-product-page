import mongoose from 'mongoose';

// 상품 생성 API - body 스키마
const createBodySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// 상품 수정 body 스키마
const updateBodySchema = new mongoose.Schema({
  ...createBodySchema.obj,
  status: {
    type: String,
  },
});

// 상품 상세조회, 수정, 삭제 Path Parameters
const productIdSchema = new mongoose.Schema({
  id: {
    type: String,
  },
});

// 상품 생성, 목록 조회, 상세 조회, 수정 response 성공 시
const successSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  manager: {
    type: String,
  },
  status: {
    type: String,
    enum: ['FOR_SALE', 'SOLD_OUT'],
    default: 'FOR_SALE',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// 삭제 성공 시 response
const deleteIdSchema = new mongoose.Schema({
  id: {
    type: String,
  },
});

// 모델 생성
const CreateRequest = mongoose.model('CreateRequest', createBodySchema);
const UpdateRequest = mongoose.model('UpdateRequest', updateBodySchema);
const ProductIdPath = mongoose.model('ProductIdPath', productIdSchema);
const Product = mongoose.model('Product', successSchema);
const DeleteProduct = mongoose.model('DeleteProduct', deleteIdSchema);

export { CreateRequest, UpdateRequest, ProductIdPath, Product, DeleteProduct };
