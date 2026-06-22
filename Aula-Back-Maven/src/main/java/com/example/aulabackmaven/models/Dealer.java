package com.example.aulabackmaven.models;

public class Dealer extends Person {

    public Dealer() {
        super("Dealer");
    }

    public boolean shouldBuyCard() {
        return getHandValue() < 17;
    }
}
