export class UpdateProductRequest {
    name?: string;
    description?: string;
    price?: string;
    id!: string;
    imageUrl?: string;
}