package com.example.aulabackmaven.services;

import com.example.aulabackmaven.models.Dealer;
import com.example.aulabackmaven.models.Player;
import com.example.aulabackmaven.models.Cards;
import com.example.aulabackmaven.dto.GameResponseDTO;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class Jogos {

    private Player player;
    private Dealer dealer;
    private final String[] baseDeck = {"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"};
    private String gameStatus;
    private boolean isGameOver;

    public Jogos() {
        // Inicialização padrão do servidor
        resetEntities();
    }

    private void resetEntities() {
        this.player = new Player("Jogador", 1000.0);
        this.dealer = new Dealer();
        this.isGameOver = false;
        this.gameStatus = "Nova rodada! Pede carta (Hit) ou Para (Stand)?";
    }

    private String drawRandomCard() {
        Random random = new Random();
        return baseDeck[random.nextInt(baseDeck.length)];
    }

    public GameResponseDTO startNewGame() {
        // 1. Limpa completamente as cartas que estavam nas mãos antes de criar novas
        player.clearHand();
        dealer.clearHand();

        this.isGameOver = false;
        this.gameStatus = "Nova rodada! Pede carta (Hit) ou Para (Stand)?";

        // 2. Distribui estritamente DUAS cartas para cada um
        player.buyCard(drawRandomCard());
        player.buyCard(drawRandomCard());
        dealer.buyCard(drawRandomCard());
        dealer.buyCard(drawRandomCard());

        // 3. Se o jogador der a sorte de começar com 21 nas duas primeiras cartas, o jogo acaba
        if (player.getHandValue() == 21) {
            isGameOver = true;
            int dScore = dealer.getHandValue();
            if (dScore == 21) {
                gameStatus = "Empate de Blackjacks! Ambos conseguiram 21 pontos. 🤝";
            } else {
                gameStatus = "Blackjack! Você ganhou com 21 pontos direto! 🏆";
            }
        }

        return buildGameResponse();
    }

    public GameResponseDTO handleHit() {
        if (isGameOver) return buildGameResponse();

        player.buyCard(drawRandomCard());

        if (player.busted()) {
            gameStatus = "Você estourou com " + player.getHandValue() + " pontos! O Dealer ganhou. ❌";
            isGameOver = true;
        }

        return buildGameResponse();
    }

    public GameResponseDTO handleStand() {
        if (isGameOver) return buildGameResponse();

        isGameOver = true;

        // Turno do Dealer compra até atingir as regras mínimas da mesa
        while (dealer.shouldBuyCard()) {
            dealer.buyCard(drawRandomCard());
        }

        int pScore = player.getHandValue();
        int dScore = dealer.getHandValue();

        if (dealer.busted()) {
            gameStatus = "O Dealer estourou com " + dScore + " pontos! Você ganhou! 🎉";
        } else if (pScore > dScore) {
            gameStatus = "Você ganhou com " + pScore + " contra " + dScore + "! 🏆";
        } else if (pScore < dScore) {
            gameStatus = "O Dealer ganhou com " + dScore + " contra " + pScore + ". 🎴";
        } else {
            gameStatus = "Empate! Ambos ficaram com " + pScore + " pontos. 🤝";
        }

        return buildGameResponse();
    }

    private GameResponseDTO buildGameResponse() {
        Cards cardsRule = new Cards();

        List<Map<String, Object>> pCardsMapped = new ArrayList<>();
        for (String cardName : player.getHand()) {
            int val = cardName.equals("A") ? 11 : cardsRule.getCardValue(cardName, 0);
            pCardsMapped.add(Map.of("name", cardName, "value", val));
        }

        List<Map<String, Object>> dCardsMapped = new ArrayList<>();
        for (String cardName : dealer.getHand()) {
            int val = cardName.equals("A") ? 11 : cardsRule.getCardValue(cardName, 0);
            dCardsMapped.add(Map.of("name", cardName, "value", val));
        }

        return new GameResponseDTO(
                pCardsMapped,
                dCardsMapped,
                player.getHandValue(),
                dealer.getHandValue(),
                this.gameStatus,
                this.isGameOver
        );
    }
}