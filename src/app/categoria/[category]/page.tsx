import ProductByCategoryView from "@/pages/Catalogue/ByCategory/ProductByCategoryView";

interface PageProps {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const resolvedParams = await params;
    return <ProductByCategoryView category={resolvedParams.category} />;
}       
