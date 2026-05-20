package models;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public abstract class Person {

    protected String name;
    protected List<String> hand;
    protected int handValue;

    protected Cards cards = new Cards();

    public Person(String name) {
        this.name = name;
        this.hand = new ArrayList<>();
        this.handValue = 0;
    }

    public void buyCard(String card) {

        hand.add(card);

        handValue += cards.getCardValue(card, handValue);
    }

    public boolean busted() {
        return handValue > 21;
    }

    public String getName() {
        return name;
    }

    public List<String> getHand() {
        return hand;
    }

    public int getHandValue() {
        return handValue;
    }
}