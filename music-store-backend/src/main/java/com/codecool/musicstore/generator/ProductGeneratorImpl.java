package com.codecool.musicstore.generator;

import com.codecool.musicstore.model.Guitar.Guitar;
import com.codecool.musicstore.model.KeyboardInstruments.KeyboardInstrument;
import com.codecool.musicstore.model.PercussionInstruments.PercussionInstrument;
import com.codecool.musicstore.model.Product;
import com.codecool.musicstore.model.SubCategory;
import com.codecool.musicstore.model.WindInstruments.WindInstrument;
import com.codecool.musicstore.model.bass.Bass;
import com.codecool.musicstore.model.merch.Merch;
import com.codecool.musicstore.model.soundtechnic.SoundTechnic;
import com.codecool.musicstore.repositories.ProductRepository;
import com.codecool.musicstore.repositories.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
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
        SubCategory electricBassGuitarSubCategory = subCategoryRepository.findSubCategoriesByName("Electric-Bass-Guitar").get(0);
        SubCategory acousticBassGuitarSubCategory = subCategoryRepository.findSubCategoriesByName("Acoustic-Bass-Guitar").get(0);
        SubCategory fiveStringBassGuitarSubCategory = subCategoryRepository.findSubCategoriesByName("Five-String-Bass-Guitar").get(0);
        SubCategory acousticDrumSubCategory = subCategoryRepository.findSubCategoriesByName("Acoustic-Drum").get(0);
        SubCategory electricDrumSubCategory = subCategoryRepository.findSubCategoriesByName("Electric-Drum").get(0);
        SubCategory snareDrumSubCategory = subCategoryRepository.findSubCategoriesByName("Snare-Drum").get(0);
        SubCategory tamSubCategory = subCategoryRepository.findSubCategoriesByName("Tam").get(0);
        SubCategory rideCymbalSubCategory = subCategoryRepository.findSubCategoriesByName("Ride-Cymbal").get(0);
        SubCategory hitHatCymbalSubCategory = subCategoryRepository.findSubCategoriesByName("Hi-Hat-Cymbal").get(0);
        SubCategory micSubCategory = subCategoryRepository.findSubCategoriesByName("Mic").get(0);
        SubCategory standSubCategory = subCategoryRepository.findSubCategoriesByName("Stand").get(0);
        SubCategory headSetSubCategory = subCategoryRepository.findSubCategoriesByName("Headset").get(0);
        SubCategory tShirtSubCategory = subCategoryRepository.findSubCategoriesByName("T-Shirt").get(0);
        SubCategory giftSubCategory = subCategoryRepository.findSubCategoriesByName("Gift").get(0);










        for (int i = 0; i < 20; i++) {


            Guitar acousticGuitar = new Guitar();

            acousticGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            acousticGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            acousticGuitar.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            acousticGuitar.setPrice(random.nextInt(200));
            acousticGuitar.setSubCategoryId(acousticGuitarSubCategory.getId());

            setPictureOfInstrument(acousticGuitar , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/Guitars/akuszt_k.jpg");


            products.add(acousticGuitar);


            Guitar electricGuitar = new Guitar();
            electricGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            electricGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            electricGuitar.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            electricGuitar.setPrice(random.nextInt(200));
            electricGuitar.setSubCategoryId(electricGuitarSubCategory.getId());
            setPictureOfInstrument(electricGuitar , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/Guitars/Elektromos_git___4d8b2663d4c79_k.jpg");
            products.add(electricGuitar);

            Guitar banjo = new Guitar();
            banjo.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            banjo.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            banjo.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            banjo.setPrice(random.nextInt(200));
            banjo.setSubCategoryId(banjoSubCategory.getId());
            setPictureOfInstrument(banjo , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/Guitars/Benjo_4d8b38c5edb1b_k.jpg");
            products.add(banjo);

            Guitar mandolin = new Guitar();
            mandolin.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            mandolin.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            mandolin.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            mandolin.setPrice(random.nextInt(200));
            mandolin.setSubCategoryId(mandolinSubcategory.getId());
            setPictureOfInstrument(mandolin , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/Guitars/Mandolin_51e7fc30a26a7_k.jpg");
            products.add(mandolin);

            Guitar ukulele = new Guitar();
            ukulele.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            ukulele.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            ukulele.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            ukulele.setPrice(random.nextInt(200));
            ukulele.setSubCategoryId(ukuleleSubcategory.getId());
            setPictureOfInstrument(ukulele , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/Guitars/010165_k.jpg");
            products.add(ukulele);

            KeyboardInstrument piano = new KeyboardInstrument();
            piano.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            piano.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            piano.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            piano.setPrice(random.nextInt(200));
            piano.setSubCategoryId(pianoSubCategory.getId());
            setPictureOfInstrument(piano , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/KeyboardInstruments/casio-ap-270-bn.jpg");
            products.add(piano);

            KeyboardInstrument midiKeyboard = new KeyboardInstrument();
            midiKeyboard.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            midiKeyboard.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            midiKeyboard.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            midiKeyboard.setPrice(random.nextInt(200));
            midiKeyboard.setSubCategoryId(midiKeyboardSubCategory.getId());
            setPictureOfInstrument(midiKeyboard , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/KeyboardInstruments/MIDI_billenty__z_4d8b44370f524_k.jpg");
            products.add(midiKeyboard);

            KeyboardInstrument synthesizer = new KeyboardInstrument();
            synthesizer.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            synthesizer.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            synthesizer.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            synthesizer.setPrice(random.nextInt(200));
            synthesizer.setSubCategoryId(synthesizerSubCategory.getId());
            setPictureOfInstrument(synthesizer , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/KeyboardInstruments/Szintetiz__tor_4d8b43be9d01c_k.jpg");
            products.add(synthesizer);

            WindInstrument flute = new WindInstrument();
            flute.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            flute.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            flute.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            flute.setPrice(random.nextInt(200));
            flute.setSubCategoryId(fluteSubCategory.getId());
            setPictureOfInstrument(flute , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/WindInstruments/fuvolak_k.jpg");
            products.add(flute);

            WindInstrument saxophone = new WindInstrument();
            saxophone.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            saxophone.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            saxophone.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            saxophone.setPrice(random.nextInt(200));
            saxophone.setSubCategoryId(saxophoneSubCategory.getId());
            setPictureOfInstrument(saxophone , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/WindInstruments/sax_k.jpg");
            products.add(saxophone);

            WindInstrument trumpet = new WindInstrument();
            trumpet.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            trumpet.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            trumpet.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            trumpet.setPrice(random.nextInt(200));
            trumpet.setSubCategoryId(trumpetSubCategory.getId());
            setPictureOfInstrument(trumpet , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/WindInstruments/trombita_k.jpg");
            products.add(trumpet);

            Bass electricBassGuitar = new Bass();
            electricBassGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            electricBassGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            electricBassGuitar.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            electricBassGuitar.setPrice(random.nextInt(200));
            electricBassGuitar.setSubCategoryId(electricBassGuitarSubCategory.getId());
            setPictureOfInstrument(electricBassGuitar , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/Bass/el_bass_k.jpg");
            products.add(electricBassGuitar);

            Bass acousticBassGuitar = new Bass();
            acousticBassGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            acousticBassGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            acousticBassGuitar.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            acousticBassGuitar.setPrice(random.nextInt(200));
            acousticBassGuitar.setSubCategoryId(acousticBassGuitarSubCategory.getId());
            setPictureOfInstrument(acousticBassGuitar , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/Bass/01011_k.jpg");

            products.add(acousticBassGuitar);

            Bass fiveStringBassGuitar = new Bass();
            fiveStringBassGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            fiveStringBassGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            fiveStringBassGuitar.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            fiveStringBassGuitar.setPrice(random.nextInt(200));
            fiveStringBassGuitar.setSubCategoryId(fiveStringBassGuitarSubCategory.getId());
            setPictureOfInstrument(fiveStringBassGuitar , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/Bass/el_bass_lh_k.jpg");

            products.add(fiveStringBassGuitar);

            PercussionInstrument acousticDrum = new PercussionInstrument();
            acousticDrum.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            acousticDrum.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            acousticDrum.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            acousticDrum.setPrice(random.nextInt(200));
            acousticDrum.setSubCategoryId(acousticDrumSubCategory.getId());
            setPictureOfInstrument(acousticDrum , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/PercussionInstrument/acoustic-drum-sets-1005.png");

            products.add(acousticDrum);

            PercussionInstrument electricDrum = new PercussionInstrument();
            electricDrum.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            electricDrum.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            electricDrum.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            electricDrum.setPrice(random.nextInt(200));
            electricDrum.setSubCategoryId(electricDrumSubCategory.getId());
            setPictureOfInstrument(electricDrum , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/PercussionInstrument/electric-drum-sets-1006.png");

            products.add(electricDrum);

            PercussionInstrument snareDrum = new PercussionInstrument();
            snareDrum.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            snareDrum.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            snareDrum.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            snareDrum.setPrice(random.nextInt(200));
            snareDrum.setSubCategoryId(snareDrumSubCategory.getId());
            setPictureOfInstrument(snareDrum , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/PercussionInstrument/01064_k.jpg");

            products.add(snareDrum);

            PercussionInstrument tamDrum = new PercussionInstrument();
            tamDrum.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            tamDrum.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            tamDrum.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            tamDrum.setPrice(random.nextInt(200));
            tamDrum.setSubCategoryId(tamSubCategory.getId());
            setPictureOfInstrument(tamDrum , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/PercussionInstrument/handpan_k.jpg");

            products.add(tamDrum);

            PercussionInstrument hiHatCymbal = new PercussionInstrument();
            hiHatCymbal.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            hiHatCymbal.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            hiHatCymbal.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            hiHatCymbal.setPrice(random.nextInt(200));
            hiHatCymbal.setSubCategoryId(hitHatCymbalSubCategory.getId());
            setPictureOfInstrument(hiHatCymbal , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/PercussionInstrument/01087_k.jpg");

            products.add(hiHatCymbal);

            PercussionInstrument ride = new PercussionInstrument();
            ride.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            ride.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            ride.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            ride.setPrice(random.nextInt(200));
            ride.setSubCategoryId(rideCymbalSubCategory.getId());
            setPictureOfInstrument(ride , "C:/Users/PC/codecool/ADVANCE/music-store/music-store-backend/src/main/resources/stockpohotos/PercussionInstrument/ride.jpg");

            products.add(ride);

            SoundTechnic mic = new SoundTechnic();
            mic.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            mic.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            mic.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            mic.setPrice(random.nextInt(200));
            mic.setSubCategoryId(micSubCategory.getId());
            products.add(mic);

            SoundTechnic stand = new SoundTechnic();
            stand.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            stand.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            stand.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            stand.setPrice(random.nextInt(200));
            stand.setSubCategoryId(standSubCategory.getId());
            products.add(stand);

            SoundTechnic headSet = new SoundTechnic();
            headSet.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            headSet.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            headSet.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            headSet.setPrice(random.nextInt(200));
            headSet.setSubCategoryId(headSetSubCategory.getId());
            products.add(headSet);

            Merch tShirt = new Merch();
            tShirt.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            tShirt.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            tShirt.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            tShirt.setPrice(random.nextInt(200));
            tShirt.setSubCategoryId(tShirtSubCategory.getId());
            products.add(tShirt);

            Merch gift = new Merch();
            gift.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            gift.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            gift.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            gift.setPrice(random.nextInt(200));
            gift.setSubCategoryId(giftSubCategory.getId());
            products.add(gift);
        }


        productRepository.saveAll(products);

    }

    private static void setPictureOfInstrument(Product instrument , String filePath ) {

        Path path = Path.of(filePath);

        try {
            byte[] imageData = Files.readAllBytes(path);
            instrument.setImage(imageData);
        } catch (IOException e) {
            System.out.println("No photoFounded");
            e.printStackTrace();
        }
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
        "Flute",
        "Electric-Bass-Guitar",
        "Acoustic-Bass-Guitar",
        "Five-String-Bass-Guitar",
                "Acoustic-Drum",
                "Electric-Drum",
        "Snare-Drum",
        "Tam",
        "Ride-Cymbal",
        "Hi-Hat-Cymbal",
        "Mic",
        "Stand",
        "Headset",
        "T-Shirt",
        "Gift"};


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
                "WindInstrument",
                "Bass",
                "Bass",
                "Bass",
                "PercussionInstrument",
                "PercussionInstrument",
                "PercussionInstrument",
                "PercussionInstrument",
                "PercussionInstrument",
                "PercussionInstrument",
                "SoundTechnic",
                "SoundTechnic",
                "SoundTechnic",
                "Merch",
                "Merch"
        };

        for (int i = 0; i < categories.length; i++) {
            SubCategory subCategory = new SubCategory();
            subCategory.setCategory(categories[i]);
            subCategory.setName(subCategoryNames[i]);
            subCategories.add(subCategory);

        }
        subCategoryRepository.saveAll(subCategories);

    }
}
