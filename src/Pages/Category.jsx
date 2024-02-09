import React, { useState, useEffect } from "react";
import ProductCards from "../Components/ProductCards";
import { useDispatch, useSelector } from "react-redux";
import { productsApi } from "../Store/Slices/productDataSlices";
import 'react-loading-skeleton/dist/skeleton.css'
import Select from 'react-select';


const Category = () => {

    const dispatch = useDispatch();
    const productsLists = useSelector((state) => state.productsData.Data);
    const Loader = useSelector((state) => state.productsData.isLoading);

    const [otherBrand, setOtherBrands] = useState([
        { id: 0, brand: 'Apple', state: false },
        { id: 1, brand: 'Samsung', state: false },
        { id: 2, brand: 'OPPO', state: false },
        { id: 3, brand: 'Huawei', state: false },
        { id: 4, brand: 'Microsoft Surface', state: false },
        { id: 5, brand: 'Infinix', state: false },
        { id: 6, brand: 'Golden', state: false }
    ]);
    const [selectedBrand, setSelectedBrands] = useState('All Brands');
    const [priceRange, setPriceRange] = useState({ minPrice: '0', maxPrice: '2000' });
    const [showButton, setShowButton] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        { category: 'smartphones', label: 'smartphones' },
        { category: 'laptops', label: 'laptops' },
        { category: 'fragrances', label: 'fragrances' }
    ];

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption.category);
    };

    const filterByBrands = (brand) => {
        let updatedBrands;
        if (brand === 'All Brands') {
            updatedBrands = otherBrand.map((brands) => ({ ...brands, state: selectedBrand.includes('All Brands') }));
        } else {
            updatedBrands = otherBrand.map((item) => item.brand === brand ? { ...item, state: true } : { ...item, state: false });
        }
        setOtherBrands(updatedBrands);
        setSelectedBrands(brand);
    };

    const clickToShowLabel = (id) => {
        if (showButton.includes(id)) {
            const singleShowButton = showButton.filter((item) => item.id !== id);
            setShowButton(singleShowButton);
        } else {
            setShowButton([showButton, id]);
        }
    }

    const handlePriceRange = (e) => {
        let value = parseInt(e.target.value);
        setPriceRange({ ...priceRange, maxPrice: value });
    }

    const combineData = productsLists.filter((product) =>
        (selectedBrand === 'All Brands' || product.brand === selectedBrand)
        && product.price >= priceRange.minPrice
        && product.price <= priceRange.maxPrice
        && (selectedCategory === '' || product.category === selectedCategory)
    );


    useEffect(() => {
        dispatch(productsApi({
            minPrice: priceRange.minPrice,
            maxPrice: priceRange.maxPrice,
            otherBrand,
            selectedBrand,
            selectedCategory
        }));
    }, [priceRange, dispatch, otherBrand, selectedBrand, selectedCategory]);



    return (
        <>
            <div className="container product-cards">
                <div className="row mb-3 text-center">
                    <div className="col-md-3 themed-grid-col">
                        <div className="className" style={{ position: 'sticky', top: '2rem' }}>
                            <label htmlFor="brandDropdown" className="form-label">Select Brand:</label>
                            <div className="form-check text-start">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexCheckboxDefaultAll"
                                    checked={selectedBrand.length === 0 || selectedBrand.includes('All Brands')}
                                    onChange={() => filterByBrands('All Brands')}
                                />
                                <label className="form-check-label" htmlFor="flexCheckboxDefaultAll">
                                    All Brands
                                </label>
                            </div>
                            {otherBrand.map((checkbox, id) => (
                                <div className="form-check text-start" onClick={() => clickToShowLabel(checkbox.id)} key={id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`flexCheckChecked${id}`}
                                        checked={checkbox.state}
                                        onChange={() => filterByBrands(checkbox.brand, checkbox.id)}
                                    />
                                    <label className="form-check-label" htmlFor={`flexCheckChecked${id}`}>
                                        {checkbox.brand}
                                    </label>
                                </div>
                            ))}
                            <hr />
                            <label htmlFor="customRange1" className="form-label">
                                Price range: {priceRange.minPrice} - {priceRange.maxPrice}
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                min={0}
                                max={2000}
                                id="customRange1"
                                value={priceRange.maxPrice}
                                onChange={handlePriceRange}
                            />
                            <hr />
                            <label htmlFor="brandDropdown" className="form-label">Select Category:</label>
                            <Select
                                value={categories.find((cat) => cat.category === selectedCategory)}
                                onChange={handleCategoryChange}
                                options={categories}
                            />
                        </div>
                    </div>
                    <div className="col-md-9 themed-grid-col">
                        {showButton.map((id) => {
                            const findData = otherBrand.find((item) => item.id === id);
                            if (!findData) {
                                return null;
                            }
                            return (
                                <span key={id} className="badge d-flex p-2 align-items-center text-primary-emphasis bg-primary-outline border border-primary-subtle rounded-pill">
                                    <span className="px-1">{findData.brand}</span>
                                </span>
                            )
                        })}
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            <ProductCards
                                combineData={combineData}
                                Loader={Loader}
                                showButton={showButton}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
