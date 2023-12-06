package com.codecool.musicstore.Service.Dao;

import com.codecool.musicstore.model.Product;
import com.codecool.musicstore.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Repository

public class ProductDaoImpl implements ProductDao{
    @Autowired

    ProductRepository productRepository;
    Random random=new Random();






    @Override
    public void saveProduct(Product product) {
      productRepository.save(product);
    }

    @Override
    public void saveProducts(List<Product> productListroductList) {
        productRepository.saveAll(productListroductList);

    }

    @Override
    public void populateDataBase() {

        List<String> names = List.of(
                "Piano", "Guitar", "Violin", "Flute", "Trumpet", "Saxophone", "Drums", "Cello",
                "Clarinet", "Harp", "Trombone", "Banjo", "Accordion", "Ukulele", "Bassoon", "French Horn",
                "Mandolin", "Xylophone", "Oboe", "Double Bass", "Bagpipes", "Congas", "Marimba", "Sitar",
                "Didgeridoo", "Tambourine", "Piccolo", "Triangle", "Theremin", "Balalaika", "Shamisen",
                "Dulcimer", "Kalimba", "Bongos", "Steel Drum", "Castanets", "Bodhrán", "Flugelhorn",
                "Djembe", "Pan Flute", "Melodica", "Recorder", "Irish Whistle", "Kazoo", "Baritone",
                "Jaw Harp", "Hurdy-gurdy", "Cymbals", "Zither", "Mbira"
        );
        List<String> colors = List.of(
                "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Pink", "Brown", "Cyan", "Magenta",
                "Teal", "Lime", "Indigo", "Violet", "Maroon", "Gold", "Silver", "Turquoise", "Plum", "Beige",
                "Crimson", "Olive", "Aqua", "Salmon", "Lavender", "Khaki", "Sienna", "Slate", "Tomato", "Chocolate",
                "Periwinkle", "Peach", "Sky Blue", "Forest Green", "Midnight Blue", "Royal Blue", "Powder Blue", "Lemon",
                "PeachPuff", "SeaGreen", "MediumSlateBlue", "DarkOliveGreen", "HotPink", "DarkSlateGray", "LightSalmon",
                "SandyBrown", "PaleVioletRed", "DarkSeaGreen", "MediumPurple", "DarkTurquoise", "MediumAquamarine"
        );
        List<Product>seedProducts=new ArrayList<>();




        for(int i =0;i<50;i++){

            int price =random.nextInt(100);
            Product product =new Product(getRandom(names),price, getRandom(colors) );
            seedProducts.add(product);
        }
       saveProducts(seedProducts);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    private  String getRandom(List <String> randomList) {
        Random random = new Random();
        int randomIndex = random.nextInt(randomList.size());
        return randomList.get(randomIndex);
    }
}
