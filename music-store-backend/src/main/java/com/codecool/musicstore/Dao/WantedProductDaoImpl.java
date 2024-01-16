package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.wantedProduct.WantedProduct;
import com.codecool.musicstore.repositories.WantedProdutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

@Primary
@Repository
public class WantedProductDaoImpl implements WantedProductDao{
    private WantedProdutRepository wantedProdutRepository;
@Autowired
    public WantedProductDaoImpl(WantedProdutRepository wantedProdutRepository) {
        this.wantedProdutRepository = wantedProdutRepository;
    }

    @Override
    public void saveWantedProduct(WantedProduct wantedProduct) {
        wantedProdutRepository.save(wantedProduct);
    }
}
