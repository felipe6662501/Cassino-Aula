package com.example.aulabackmaven.models;

import java.util.ArrayList;
import java.util.List;

public abstract class Person {

    protected String name;
    protected List<String> hand;

    protected Cards cards = new Cards();

    public Person(String name) {
        this.name = name;
        this.hand = new ArrayList<>();
    }

    public void buyCard(String card) {
        hand.add(card);
    }

    public void clearHand() {
        this.hand.clear();
    }

    public boolean busted() {
        return getHandValue() > 21;
    }

    public String getName() {
        return name;
    }

    public List<String> getHand() {
        return hand;
    }

    public int getHandValue() {
        int totalValue = 0;
        int acesCount = 0;

        for (String card : hand) {
            if (card.equals("A")) {
                acesCount++;
            } else {
                totalValue += cards.getCardValue(card, totalValue);
            }
        }

        for (int i = 0; i < acesCount; i++) {
            totalValue += cards.getAValue(totalValue);
        }

        return totalValue;
    }
}