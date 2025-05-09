import ProductDetail from "@/pages/Catalogue/ById/ProductDetail";
import Opinions from "@/pages/Catalogue/ById/Opinions";
interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    return (
        <div className="flex flex-col items-center justify-center">
            <ProductDetail params={resolvedParams} />
            <Opinions />
        </div>
    )
}       
