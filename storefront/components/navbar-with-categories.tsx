import { getCategories } from "@/lib/api";
import type { Category } from "@/types/categories";
import Navbar from "./navbar";

const NavbarWithCategories = async () => {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Failed to fetch categories for navigation:", error);
    categories = [];
  }

  return <Navbar categories={categories} />;
};

export default NavbarWithCategories;
