package com.example.aulabackmaven.models;
import java.util.HashMap;
import java.util.Map;

public class Cards {

    private Map<String, Integer> cards = new HashMap<>();

    public Cards() {

        cards.put("A", 1);
        cards.put("2", 2);
        cards.put("3", 3);
        cards.put("4", 4);
        cards.put("5", 5);
        cards.put("6", 6);
        cards.put("7", 7);
        cards.put("8", 8);
        cards.put("9", 9);
        cards.put("10", 10);

        cards.put("J", 10);
        cards.put("Q", 10);
        cards.put("K", 10);
    }

    public int getCardValue(String card, int currentHandValue) {
        return cards.get(card);
    }

    public int getAValue(int handValue) {
        return handValue > 10 ? 1 : 11;
    }
}