package com.codecool.musicstore.generator;

import com.codecool.musicstore.model.product.instruments.Guitar.Guitar;
import com.codecool.musicstore.model.product.instruments.KeyboardInstruments.KeyboardInstrument;
import com.codecool.musicstore.model.product.instruments.PercussionInstruments.PercussionInstrument;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.product.instruments.SubCategory;
import com.codecool.musicstore.model.product.instruments.WindInstruments.WindInstrument;
import com.codecool.musicstore.model.product.instruments.bass.Bass;
import com.codecool.musicstore.model.product.merch.Merch;
import com.codecool.musicstore.model.product.soundtechnic.SoundTechnic;
import com.codecool.musicstore.repositories.ProductRepository;
import com.codecool.musicstore.repositories.SubCategoryRepository;
import jakarta.transaction.Transactional;
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

    @Transactional
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
            acousticGuitar.setQuantity(random.nextInt(97) + 4);
            acousticGuitar.setSubCategoryId(acousticGuitarSubCategory.getId());

            setPictureOfInstrument(acousticGuitar , "Guitars/akuszt_k.jpg");


            products.add(acousticGuitar);


            Guitar electricGuitar = new Guitar();
            electricGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            electricGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            electricGuitar.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            electricGuitar.setPrice(random.nextInt(200));
            electricGuitar.setQuantity(random.nextInt(97) + 4);
            electricGuitar.setSubCategoryId(electricGuitarSubCategory.getId());
            setPictureOfInstrument(electricGuitar , "Guitars/Elektromos_git___4d8b2663d4c79_k.jpg");
            products.add(electricGuitar);

            Guitar banjo = new Guitar();
            banjo.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            banjo.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            banjo.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            banjo.setPrice(random.nextInt(200));
            banjo.setSubCategoryId(banjoSubCategory.getId());
            banjo.setQuantity(random.nextInt(97) + 4);
            setPictureOfInstrument(banjo , "Guitars/Benjo_4d8b38c5edb1b_k.jpg");
            products.add(banjo);

            Guitar mandolin = new Guitar();
            mandolin.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            mandolin.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            mandolin.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            mandolin.setPrice(random.nextInt(200));
            mandolin.setQuantity(random.nextInt(97) + 4);
            mandolin.setSubCategoryId(mandolinSubcategory.getId());
            setPictureOfInstrument(mandolin , "Guitars/Mandolin_51e7fc30a26a7_k.jpg");
            products.add(mandolin);

            Guitar ukulele = new Guitar();
            ukulele.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            ukulele.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            ukulele.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            ukulele.setPrice(random.nextInt(200));
            ukulele.setSubCategoryId(ukuleleSubcategory.getId());
            ukulele.setQuantity(random.nextInt(97) + 4);
            setPictureOfInstrument(ukulele , "Guitars/010165_k.jpg");
            products.add(ukulele);

            KeyboardInstrument piano = new KeyboardInstrument();
            piano.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            piano.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            piano.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            piano.setPrice(random.nextInt(200));
            piano.setSubCategoryId(pianoSubCategory.getId());
            piano.setQuantity(random.nextInt(97) + 4);
            setPictureOfInstrument(piano , "KeyboardInstruments/casio-ap-270-bn.jpg");
            products.add(piano);

            KeyboardInstrument midiKeyboard = new KeyboardInstrument();
            midiKeyboard.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            midiKeyboard.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            midiKeyboard.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            midiKeyboard.setPrice(random.nextInt(200));
            midiKeyboard.setQuantity(random.nextInt(97) + 4);
            midiKeyboard.setSubCategoryId(midiKeyboardSubCategory.getId());
            setPictureOfInstrument(midiKeyboard , "KeyboardInstruments/MIDI_billenty__z_4d8b44370f524_k.jpg");
            products.add(midiKeyboard);

            KeyboardInstrument synthesizer = new KeyboardInstrument();
            synthesizer.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            synthesizer.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            synthesizer.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            synthesizer.setPrice(random.nextInt(200));
            synthesizer.setQuantity(random.nextInt(97) + 4);
            synthesizer.setSubCategoryId(synthesizerSubCategory.getId());
            setPictureOfInstrument(synthesizer , "KeyboardInstruments/Szintetiz__tor_4d8b43be9d01c_k.jpg");
            products.add(synthesizer);

            WindInstrument flute = new WindInstrument();
            flute.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            flute.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            flute.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            flute.setPrice(random.nextInt(200));
            flute.setQuantity(random.nextInt(97) + 4);
            flute.setSubCategoryId(fluteSubCategory.getId());
            setPictureOfInstrument(flute , "WindInstruments/fuvolak_k.jpg");
            products.add(flute);

            WindInstrument saxophone = new WindInstrument();
            saxophone.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            saxophone.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            saxophone.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            saxophone.setPrice(random.nextInt(200));
            saxophone.setQuantity(random.nextInt(97) + 4);
            saxophone.setSubCategoryId(saxophoneSubCategory.getId());
            setPictureOfInstrument(saxophone , "WindInstruments/sax_k.jpg");
            products.add(saxophone);

            WindInstrument trumpet = new WindInstrument();
            trumpet.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            trumpet.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            trumpet.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            trumpet.setPrice(random.nextInt(200));
            trumpet.setQuantity(random.nextInt(97) + 4);
            trumpet.setSubCategoryId(trumpetSubCategory.getId());
            setPictureOfInstrument(trumpet , "WindInstruments/trombita_k.jpg");
            products.add(trumpet);

            Bass electricBassGuitar = new Bass();
            electricBassGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            electricBassGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            electricBassGuitar.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            electricBassGuitar.setPrice(random.nextInt(200));
            electricBassGuitar.setQuantity(random.nextInt(97) + 4);
            electricBassGuitar.setSubCategoryId(electricBassGuitarSubCategory.getId());
            setPictureOfInstrument(electricBassGuitar , "Bass/el_bass_k.jpg");
            products.add(electricBassGuitar);

            Bass acousticBassGuitar = new Bass();
            acousticBassGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            acousticBassGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            acousticBassGuitar.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            acousticBassGuitar.setPrice(random.nextInt(200));
            acousticBassGuitar.setQuantity(random.nextInt(97) + 4);
            acousticBassGuitar.setSubCategoryId(acousticBassGuitarSubCategory.getId());
            setPictureOfInstrument(acousticBassGuitar , "Bass/01011_k.jpg");

            products.add(acousticBassGuitar);

            Bass fiveStringBassGuitar = new Bass();
            fiveStringBassGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            fiveStringBassGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            fiveStringBassGuitar.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            fiveStringBassGuitar.setPrice(random.nextInt(200));
            fiveStringBassGuitar.setQuantity(random.nextInt(97) + 4);
            fiveStringBassGuitar.setSubCategoryId(fiveStringBassGuitarSubCategory.getId());
            setPictureOfInstrument(fiveStringBassGuitar , "Bass/el_bass_lh_k.jpg");

            products.add(fiveStringBassGuitar);

            PercussionInstrument acousticDrum = new PercussionInstrument();
            acousticDrum.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            acousticDrum.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            acousticDrum.setQuantity(random.nextInt(97) + 4);
            acousticDrum.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            acousticDrum.setPrice(random.nextInt(200));
            acousticDrum.setSubCategoryId(acousticDrumSubCategory.getId());
            setPictureOfInstrument(acousticDrum , "PercussionInstrument/acoustic-drum-sets-1005.png");

            products.add(acousticDrum);

            PercussionInstrument electricDrum = new PercussionInstrument();
            electricDrum.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            electricDrum.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            electricDrum.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            electricDrum.setPrice(random.nextInt(200));
            electricDrum.setQuantity(random.nextInt(97) + 4);
            electricDrum.setSubCategoryId(electricDrumSubCategory.getId());
            setPictureOfInstrument(electricDrum , "PercussionInstrument/electric-drum-sets-1006.png");

            products.add(electricDrum);

            PercussionInstrument snareDrum = new PercussionInstrument();
            snareDrum.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            snareDrum.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            snareDrum.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            snareDrum.setPrice(random.nextInt(200));
            snareDrum.setSubCategoryId(snareDrumSubCategory.getId());
            setPictureOfInstrument(snareDrum , "PercussionInstrument/01064_k.jpg");

            products.add(snareDrum);

            PercussionInstrument tamDrum = new PercussionInstrument();
            tamDrum.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            tamDrum.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            tamDrum.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            tamDrum.setPrice(random.nextInt(200));
            tamDrum.setSubCategoryId(tamSubCategory.getId());
            tamDrum.setQuantity(random.nextInt(97) + 4);
            setPictureOfInstrument(tamDrum , "PercussionInstrument/handpan_k.jpg");

            products.add(tamDrum);

            PercussionInstrument hiHatCymbal = new PercussionInstrument();
            hiHatCymbal.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            hiHatCymbal.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            hiHatCymbal.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            hiHatCymbal.setPrice(random.nextInt(200));
            hiHatCymbal.setQuantity(random.nextInt(97) + 4);
            hiHatCymbal.setSubCategoryId(hitHatCymbalSubCategory.getId());
            setPictureOfInstrument(hiHatCymbal , "PercussionInstrument/01087_k.jpg");

            products.add(hiHatCymbal);

            PercussionInstrument ride = new PercussionInstrument();
            ride.setQuantity(random.nextInt(97) + 4);
            ride.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            ride.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            ride.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            ride.setPrice(random.nextInt(200));
            ride.setSubCategoryId(rideCymbalSubCategory.getId());
            setPictureOfInstrument(ride , "PercussionInstrument/ride.jpg");

            products.add(ride);

            SoundTechnic mic = new SoundTechnic();
            mic.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            mic.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            mic.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            mic.setQuantity(random.nextInt(97) + 4);
            mic.setPrice(random.nextInt(200));
            mic.setSubCategoryId(micSubCategory.getId());
            products.add(mic);

            SoundTechnic stand = new SoundTechnic();
            stand.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            stand.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            stand.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            stand.setPrice(random.nextInt(200));
            stand.setQuantity(random.nextInt(97) + 4);
            stand.setSubCategoryId(standSubCategory.getId());
            products.add(stand);

            SoundTechnic headSet = new SoundTechnic();
            headSet.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            headSet.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            headSet.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            headSet.setPrice(random.nextInt(200));
            headSet.setQuantity(random.nextInt(97) + 4);
            headSet.setSubCategoryId(headSetSubCategory.getId());
            products.add(headSet);

            Merch tShirt = new Merch();
            tShirt.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            tShirt.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            tShirt.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            tShirt.setPrice(random.nextInt(200));
            tShirt.setQuantity(random.nextInt(97) + 4);
            tShirt.setSubCategoryId(tShirtSubCategory.getId());
            products.add(tShirt);

            Merch gift = new Merch();
            gift.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            gift.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            gift.setColor(guitarBrands[random.nextInt(guitarColors.length)]);
            gift.setPrice(random.nextInt(200));
            gift.setQuantity(random.nextInt(97) + 4);
            gift.setSubCategoryId(giftSubCategory.getId());
            products.add(gift);
        }


        productRepository.saveAll(products);

    }

    private static void setPictureOfInstrument(Product instrument , String filePath ) {
        System.out.println("filepath" + filePath);
        String imagePath = "src/main/resources/stockpohotos/" + filePath;
        System.out.println("imagePath" + imagePath);
        Path path = Path.of(imagePath);

        try {
            byte[] imageData = Files.readAllBytes(path);
            instrument.setImage(imageData);
        } catch (IOException e) {
            System.out.println("No photoFounded");
            e.printStackTrace();
        }
    }


    public void setPictureOfSubCategory(SubCategory subCategory, String filePath) {
        String imagePath = "src/main/resources/stockpohotos/" + filePath;
Path path = Path.of(imagePath);
        System.out.println("peth " + path);
        try {
            byte[] imageData = Files.readAllBytes(path);
            subCategory.setImage(imageData);
        } catch (IOException e) {
            System.out.println("No photo found for subcategory: " + subCategory.getName());
            e.printStackTrace();
        }
    }

    @Transactional
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

        String[] subCategoryImagePaths = {
                // Add paths to your subcategory images here
                "SubCategory/Elektromos_git___4d8b2663d4c79_k.jpg",
                "SubCategory/akuszt_k.jpg",
                "SubCategory/010165_k.jpg",
                "SubCategory/Benjo_4d8b38c5edb1b_k.jpg",
                "SubCategory/Mandolin_51e7fc30a26a7_k.jpg",
                "SubCategory/Szintetiz__tor_4d8b43be9d01c_k.jpg",
                "SubCategory/MIDI_billenty__z_4d8b44370f524_k.jpg",
                "SubCategory/casio-ap-270-bn.jpg",
                "SubCategory/trombita_k.jpg",
                "SubCategory/sax_k.jpg",
                "SubCategory/fuvolak_k.jpg",
                "SubCategory/el_bass_k.jpg",
                "SubCategory/01011_k.jpg",
                "SubCategory/el_bass_lh_k.jpg",
                "SubCategory/acoustic-drum-sets-1005.png",
                "SubCategory/electric-drum-sets-1006.png",
                "SubCategory/el_bass_k.jpg2",
                "SubCategory/01064_k.jpg",
                "SubCategory/ride.jpg",
                "SubCategory/hihat.jpg",
                "SubCategory/hihat.jpg2",
                "SubCategory/hihat.jpg3",
                "SubCategory/hihat.jpg4",
                "SubCategory/hihat.jpg5",
                "SubCategory/hihat.jpg6",




                // Add paths for other subcategories
        };

        for (int i = 0; i < categories.length; i++) {
            SubCategory subCategory = new SubCategory();
            subCategory.setCategory(categories[i]);
            subCategory.setName(subCategoryNames[i]);
            subCategories.add(subCategory);
            setPictureOfSubCategory(subCategory, subCategoryImagePaths[i]);

        }
        subCategoryRepository.saveAll(subCategories);

    }
}
