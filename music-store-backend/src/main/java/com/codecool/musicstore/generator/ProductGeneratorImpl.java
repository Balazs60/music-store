package com.codecool.musicstore.generator;

import com.codecool.musicstore.model.Guitar.Guitar;
import com.codecool.musicstore.model.KeyboardInstruments.KeyboardInstrument;
import com.codecool.musicstore.model.Product;
import com.codecool.musicstore.model.SubCategory;
import com.codecool.musicstore.model.WindInstruments.WindInstrument;
import com.codecool.musicstore.repositories.ProductRepository;
import com.codecool.musicstore.repositories.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
public class ProductGeneratorImpl implements ProductGenerator {
    private ProductRepository productRepository;
    private SubCategoryRepository subCategoryRepository;
    private Random random;


    @Autowired

    public ProductGeneratorImpl(ProductRepository productRepository, SubCategoryRepository subCategoryRepository) {
        this.productRepository = productRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.random = new Random();
    }

    @Override
    public void seedProducts() {
        List<Product> products = new ArrayList<>();
        String[] guitarBrands = {
                "Fender",
                "Gibson",
                "Ibanez",
                "PRS",
                "Epiphone",
                "Taylor",
                "Martin",
                "Jackson",
                "Schecter",
                "Gretsch",
                "Yamaha",
                "ESP",
                "D'Angelico",
                "Rickenbacker",
                "G&L",
                "Collings",
                "Guild",
                "Seagull",
                "Godin",
                "Cort"
        };
        String[] guitarNames = {
                "Stratocaster",
                "Les Paul",
                "SG",
                "Telecaster",
                "Jazzmaster",
                "Explorer",
                "JEM",
                "PRS Custom 24",
                "Hummingbird",
                "Dreadnought",
                "SG Standard",
                "ES-335",
                "Flying V",
                "OM-28",
                "Superstrat",
                "Les Paul Standard",
                "Dreadnought Junior",
                "Les Paul Custom",
                "ES-175",
                "C-1 Hellraiser"
        };
        String[] guitarColors = {
                "Sunburst",
                "Goldtop",
                "Cherry Red",
                "Butterscotch Blonde",
                "Olympic White",
                "Explorer Natural",
                "White",
                "Tobacco Burst",
                "Vintage Cherry Burst",
                "Natural",
                "Ebony",
                "Cherry",
                "Ebony",
                "Natural",
                "Solid Colors",
                "Heritage Cherry Sunburst",
                "Natural",
                "Ebony",
                "Sunburst",
                "Black Cherry"
        };

        SubCategory acousticGuitarSubCategory = subCategoryRepository.findSubCategoriesByName("Akusztikus-Gitár").get(0);
        SubCategory electricGuitarSubCategory = subCategoryRepository.findSubCategoriesByName("Elektromos-Gitár").get(0);
        SubCategory banjoSubCategory = subCategoryRepository.findSubCategoriesByName("Banjo").get(0);
        SubCategory mandolinSubcategory = subCategoryRepository.findSubCategoriesByName("Mandolin").get(0);
        SubCategory ukuleleSubcategory = subCategoryRepository.findSubCategoriesByName("Ukulele").get(0);
        SubCategory synthesizerSubCategory = subCategoryRepository.findSubCategoriesByName("Synthesizer").get(0);
        SubCategory midiKeyboardSubCategory  = subCategoryRepository.findSubCategoriesByName("Midi Keyboard").get(0);
        SubCategory pianoSubCategory  = subCategoryRepository.findSubCategoriesByName("Piano").get(0);
        SubCategory trumpetSubCategory = subCategoryRepository.findSubCategoriesByName("Trumpet").get(0);
        SubCategory saxophoneSubCategory = subCategoryRepository.findSubCategoriesByName("Saxophone").get(0);
        SubCategory fluteSubCategory = subCategoryRepository.findSubCategoriesByName("Flute").get(0);




        for (int i = 0; i < 20; i++) {


            Guitar acousticGuitar = new Guitar();

            acousticGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            acousticGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            acousticGuitar.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            acousticGuitar.setPrice(random.nextInt(200));
            acousticGuitar.setSubCategoryId(acousticGuitarSubCategory.getId());
            products.add(acousticGuitar);


            Guitar electricGuitar = new Guitar();
            electricGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            electricGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            electricGuitar.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            electricGuitar.setPrice(random.nextInt(200));
            electricGuitar.setSubCategoryId(electricGuitarSubCategory.getId());
            products.add(electricGuitar);

            Guitar banjo = new Guitar();
            banjo.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            banjo.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            banjo.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            banjo.setPrice(random.nextInt(200));
            banjo.setSubCategoryId(banjoSubCategory.getId());
            products.add(banjo);

            Guitar mandolin = new Guitar();
            mandolin.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            mandolin.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            mandolin.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            mandolin.setPrice(random.nextInt(200));
            mandolin.setSubCategoryId(mandolinSubcategory.getId());
            products.add(mandolin);

            Guitar ukulele = new Guitar();
            ukulele.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            ukulele.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            ukulele.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            ukulele.setPrice(random.nextInt(200));
            ukulele.setSubCategoryId(ukuleleSubcategory.getId());
            products.add(ukulele);

            KeyboardInstrument piano = new KeyboardInstrument();
            piano.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            piano.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            piano.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            piano.setPrice(random.nextInt(200));
            piano.setSubCategoryId(pianoSubCategory.getId());
            products.add(piano);

            KeyboardInstrument midiKeyboard = new KeyboardInstrument();
            midiKeyboard.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            midiKeyboard.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            midiKeyboard.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            midiKeyboard.setPrice(random.nextInt(200));
            midiKeyboard.setSubCategoryId(midiKeyboardSubCategory.getId());
            products.add(midiKeyboard);

            KeyboardInstrument synthesizer = new KeyboardInstrument();
            synthesizer.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            synthesizer.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            synthesizer.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            synthesizer.setPrice(random.nextInt(200));
            synthesizer.setSubCategoryId(synthesizerSubCategory.getId());
            products.add(synthesizer);

            WindInstrument flute = new WindInstrument();
            flute.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            flute.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            flute.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            flute.setPrice(random.nextInt(200));
            flute.setSubCategoryId(fluteSubCategory.getId());
            products.add(flute);

            WindInstrument saxophone = new WindInstrument();
            saxophone.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            saxophone.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            saxophone.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            saxophone.setPrice(random.nextInt(200));
            saxophone.setSubCategoryId(saxophoneSubCategory.getId());
            products.add(saxophone);

            WindInstrument trumpet = new WindInstrument();
            trumpet.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            trumpet.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            trumpet.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            trumpet.setPrice(random.nextInt(200));
            trumpet.setSubCategoryId(trumpetSubCategory.getId());
            products.add(trumpet);
        }
        productRepository.saveAll(products);

    }

    @Override
    public void seedSubCategories() {
        List<SubCategory> subCategories = new ArrayList<>();
        String[] subCategoryNames = {
                "Elektromos-Gitár",
                "Akusztikus-Gitár",
        "Ukulele",
        "Banjo",
        "Mandolin",
        "Synthesizer",
        "Midi Keyboard",
        "Piano",
        "Trumpet",
        "Saxophone",
        "Flute"};


        String[] categories = {
                "Guitar",
                "Guitar",
                "Guitar",
                "Guitar",
                "Guitar",
                "KeyboardInstrument",
                "KeyboardInstrument",
                "KeyboardInstrument",
                "WindInstrument",
                "WindInstrument",
                "WindInstrument"



        };

        for (int i = 0; i < 11; i++) {
            SubCategory subCategory = new SubCategory();
            subCategory.setCategory(categories[i]);
            subCategory.setName(subCategoryNames[i]);
            subCategories.add(subCategory);

        }
        subCategoryRepository.saveAll(subCategories);

    }
}
