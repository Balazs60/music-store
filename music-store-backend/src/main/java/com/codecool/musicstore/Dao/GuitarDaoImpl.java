package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.AcousticGuitar;
import com.codecool.musicstore.model.ElectricGuitar;
import com.codecool.musicstore.model.Guitar;
import com.codecool.musicstore.repositories.GuitarRepositoriy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
@Repository
public class GuitarDaoImpl implements GuitarDao {

    private GuitarRepositoriy guitarRepositoriy;
    private Random random;
    @Autowired

    public GuitarDaoImpl(GuitarRepositoriy guitarRepositoriy ) {
        this.guitarRepositoriy = guitarRepositoriy;
        this.random = new Random();
    }

    @Override
    public void saveGuitar(Guitar guitar) {
        guitarRepositoriy.save(guitar);

    }

    @Override
    public Guitar getGuitarById(UUID id) {
        return guitarRepositoriy.findById(id).get();
    }

    @Override
    public List<Guitar> getAllGuitar() {
        return guitarRepositoriy.findAll();
    }

    @Override
    public void saveGuitars(List<Guitar> guitars) {
    guitarRepositoriy.saveAll(guitars);
    }

    @Override
    public void seedGuitars() {
        List<Guitar>guitars=new ArrayList<>();
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

        for(int i =0;i<20;i++){


            AcousticGuitar acousticGuitar=new AcousticGuitar();

            acousticGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            acousticGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            acousticGuitar.setCollor(guitarBrands[random.nextInt(guitarColors.length)]);
            acousticGuitar.setPriece(random.nextInt(200));
            guitars.add(acousticGuitar);


            ElectricGuitar electricGuitar=new ElectricGuitar();
            electricGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            electricGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            electricGuitar.setCollor(guitarBrands[random.nextInt(guitarColors.length)]);
            electricGuitar.setPriece(random.nextInt(200));
            guitars.add(electricGuitar);


        }
        guitarRepositoriy.saveAll(guitars);

    }
}
