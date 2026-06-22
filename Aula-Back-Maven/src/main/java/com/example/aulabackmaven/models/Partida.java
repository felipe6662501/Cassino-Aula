package com.example.aulabackmaven.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historico_partidas")
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int jogadorPontos;
    private int dealerPontos;
    private String resultado; // Ex: "Você ganhou", "Você estourou", etc.
    private LocalDateTime dataHora;

    // Construtor padrão (obrigatório para o JPA)
    public Partida() {}

    // Construtor prático
    public Partida(int jogadorPontos, int dealerPontos, String resultado) {
        this.jogadorPontos = jogadorPontos;
        this.dealerPontos = dealerPontos;
        this.resultado = resultado;
        this.dataHora = LocalDateTime.now(); // Grava o momento exato do fim do jogo
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getJogadorPontos() { return jogadorPontos; }
    public void setJogadorPontos(int jogadorPontos) { this.jogadorPontos = jogadorPontos; }
    public int getDealerPontos() { return dealerPontos; }
    public void setDealerPontos(int dealerPontos) { this.dealerPontos = dealerPontos; }
    public String getResultado() { return resultado; }
    public void setResultado(String resultado) { this.resultado = resultado; }
    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }
}