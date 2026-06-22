package com.example.aulabackmaven.dto;

import java.util.List;
import java.util.Map;

public class GameResponseDTO {
    private List<Map<String, Object>> playerCards;
    private List<Map<String, Object>> dealerCards;
    private int playerScore;
    private int dealerScore;
    private String gameStatus;
    private boolean isGameOver;

    public GameResponseDTO(List<Map<String, Object>> playerCards, List<Map<String, Object>> dealerCards,
                           int playerScore, int dealerScore, String gameStatus, boolean isGameOver) {
        this.playerCards = playerCards;
        this.dealerCards = dealerCards;
        this.playerScore = playerScore;
        this.dealerScore = dealerScore;
        this.gameStatus = gameStatus;
        this.isGameOver = isGameOver;
    }

    public List<Map<String, Object>> getPlayerCards() { return playerCards; }
    public List<Map<String, Object>> getDealerCards() { return dealerCards; }
    public int getPlayerScore() { return playerScore; }
    public int getDealerScore() { return dealerScore; }
    public String getGameStatus() { return gameStatus; }
    public boolean isGameOver() { return isGameOver; }
}