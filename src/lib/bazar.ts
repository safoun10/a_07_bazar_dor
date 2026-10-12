import { Category, Product } from "@/types/bazar";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

type ListResponse<T> = T[] | { data: T[] };

const getList = <T>(data: ListResponse<T>): T[] =>
    Array.isArray(data) ? data : data.data;

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
        throw new Error(`Could not load categories (${response.status})`);
    }
    return getList(await response.json() as ListResponse<Category>);
}

export async function getCategory(slug: string): Promise<Category | null> {
    const response = await fetch(`${API_URL}/categories/${encodeURIComponent(slug)}`);
    if (response.status === 404) return null;
    if (!response.ok) {
        throw new Error(`Could not load category "${slug}" (${response.status})`);
    }
    return await response.json() as Category;
}

export async function getProducts(category?: string): Promise<Product[]> {
    const url = new URL(`${API_URL}/products`);
    if (category) url.searchParams.set("category", category);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not load products (${response.status})`);
    }
    return getList(await response.json() as ListResponse<Product>);
}

export async function getProduct(id: string): Promise<Product | null> {
    const response = await fetch(`${API_URL}/products/${encodeURIComponent(id)}`);
    if (response.status === 404) return null;
    if (!response.ok) {
        throw new Error(`Could not load product "${id}" (${response.status})`);
    }
    return await response.json() as Product;
}
