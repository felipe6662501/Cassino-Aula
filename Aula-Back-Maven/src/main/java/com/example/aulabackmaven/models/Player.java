package com.example.aulabackmaven.models;

public class Player extends Person {

    private double balance;
    private double bet;

    public Player(String name, double balance) {
        super(name);
        this.balance = balance;
    }

    public void makeBet(double value) {

        if(value > balance) {
            throw new IllegalArgumentException("Saldo insuficiente");
        }

        this.bet = value;
        this.balance -= value;
    }

    public void win() {
        balance += bet * 2;
    }

    public void draw() {
        balance += bet;
    }

    public double getBalance() {
        return balance;
    }

    public double getBet() {
        return bet;
    }
}