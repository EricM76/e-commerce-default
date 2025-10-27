import React from 'react';
import Hero from './Hero';
import { mockProducts } from '../mockData';
import FeaturedProductSection from './FeaturedProductSection';
import { Page } from '../App';

interface HomePageProps {
    onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    // For demonstration, pick the first featured and first sale product
    const featuredProduct = mockProducts.find(p => !p.originalPrice || p.originalPrice <= p.price);
    const saleProduct = mockProducts.find(p => p.originalPrice && p.originalPrice > p.price);

    return (
        <>
            <Hero />
            {featuredProduct && (
                <FeaturedProductSection
                    product={featuredProduct}
                    title="Collection of the Week"
                    subtitle="FEATURED"
                    description="Discover our curated selection of this week's featured products. Timeless design, impeccable quality."
                    onNavigate={onNavigate}
                    layout="right"
                />
            )}
             {saleProduct && (
                <FeaturedProductSection
                    product={saleProduct}
                    title="Exclusive Offers"
                    subtitle="ON SALE"
                    description="Don't miss out on limited-time deals. High-end fashion at unbeatable prices."
                    onNavigate={onNavigate}
                    layout="left"
                />
            )}
        </>
    );
};

export default HomePage;