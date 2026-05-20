package com.example.aulabackmaven;

import models.Player;
import models.Dealer;
import models.Cards;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;

@SpringBootApplication(
        exclude = {DataSourceAutoConfiguration.class}
)
public class AulaBackMavenApplication {

    public static void main(String[] args) {
        SpringApplication.run(AulaBackMavenApplication.class, args);

        Player player = new Player("Felipe", 1000);

        System.out.println("=== TESTE INICIAL ===");

        System.out.println(player.getName());

        System.out.println(player.getHand());

        System.out.println(player.getHandValue());



        System.out.println("\n=== COMPRANDO CARTAS ===");

        player.buyCard("A");

        System.out.println(player.getHand());

        System.out.println(player.getHandValue());



        player.buyCard("K");

        System.out.println(player.getHand());

        System.out.println(player.getHandValue());



        player.buyCard("5");

        System.out.println(player.getHand());

        System.out.println(player.getHandValue());



        System.out.println("\n=== ESTOUROU? ===");

        System.out.println(player.busted());
    }


}
