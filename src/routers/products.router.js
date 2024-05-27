import express from "express";
import mongoose from "mongoose";
import { Product } from "../schemas/product.schema.js";
import { PRODUCT_STATUS } from "../constants/priduct.constant.js";

const router = express.Router();

// 상품 생성 API
const createProduct = async (req, res) => {
  try {
    const { name, description, manager, password } = req.body;

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "이미 등록된 상품입니다." });
    }

    const newProduct = new Product({ name, description, manager, password });
    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "상품 생성 중 오류가 발생했습니다.", error });
  }
};

// 상품 목록 조회 API
const listProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "상품 목록 조회 중 오류가 발생했습니다.", error });
  }
};

// 상품 상세 조회 API
const detailProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).exec();

    if (!product) {
      return res.status(404).json({ message: "상품이 존재하지 않습니다." });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "상품 조회 중 오류가 발생했습니다.", error });
  }
};

// 상품 수정 API
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, manager, status, password } = req.body;

    const product = await Product.findById(id).exec();
    if (!product) {
      return res.status(404).json({ message: "상품이 존재하지 않습니다." });
    }

    if (product.password !== password) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    if (status && !["FOR_SALE", "SOLD_OUT"].includes(status)) {
      return res.status(400).json({
        message: "상품 상태는 [FOR_SALE, SOLD_OUT] 중 하나여야 합니다.",
      });
    }

    product.name = name;
    product.description = description;
    product.manager = manager;
    product.status = status;
    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "상품 수정 중 오류가 발생했습니다.", error });
  }
};

// 상품 삭제 API
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const product = await Product.findById(id).exec();
    if (!product) {
      return res.status(404).json({ message: "상품이 존재하지 않습니다." });
    }

    if (product.password !== password) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    await product.remove();
    return res.status(200).json({ message: "제품이 삭제되었습니다." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "상품 삭제 중 오류가 발생했습니다.", error });
  }
};

// 라우터에 핸들러를 정의합니다.
router.post("/products", createProduct);
router.get("/products", listProduct);
router.get("/products/:id", detailProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
