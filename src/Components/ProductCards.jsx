import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const ProductCards = (props) => {

    const { combineData, Loader } = props;


    return (
        <>
            <SkeletonTheme color="#f5f5f5" highlightColor="#e0e0e0">
                {Loader ? Array.from({ length: 30 }).map((_, id) => (
                    <div className="card h-100" key={id}>
                        <Skeleton height={160} width={'100%'} />
                        <div className="card-body">
                            <h5 className="card-title">
                                <Skeleton height={20} width={'80%'} />
                            </h5>
                            <p className="card-text">
                                <Skeleton count={2} height={16} />
                            </p>
                            <p className="card-text">
                                <Skeleton width={60} />
                            </p>
                            <Skeleton width={100} />
                        </div>
                    </div>
                )) : combineData.length === 0 ? <h4 className="text-center m-auto mt-4">No Product Found</h4>
                    : combineData.map((product, id) => (
                        <div className="card-wrapper" key={id} style={{ width: 'calc(100% / 3)', padding: '0 15px', marginBottom: '20px' }}>
                            <div className="card h-100">
                                <img src={product.thumbnail} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">${product.price}</p>
                                    <button className="btn btn-primary">Add to Cart</button>
                                </div>
                            </div>
                        </div>))}
            </SkeletonTheme>
        </>
    );
};

export default ProductCards;
