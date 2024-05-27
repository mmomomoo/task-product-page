import mongoose from "mongoose";
import { PRODUCT_STATUS } from "../constants/priduct.constant.js";

// 상품 생성, 목록 조회, 상세 조회, 수정 response 성공 시
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // 동일한 경우 이미 등록되었다고 표현 > 값이 유니크해야한다.
    },
    description: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.FOR_SALE,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const Product = mongoose.model("Product", productSchema);
