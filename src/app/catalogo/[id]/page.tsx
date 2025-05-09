import ProductDetail from "@/pages/Catalogue/ById/ProductDetail";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    return <ProductDetail params={resolvedParams} />;
}       
