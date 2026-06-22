package com.example.aulabackmaven.controllers;

import com.example.aulabackmaven.dto.GameResponseDTO;
import com.example.aulabackmaven.services.Jogos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.aulabackmaven.models.Partida;
import com.example.aulabackmaven.repositories.PartidaRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/blackjack")
public class BlackjackController {

    @Autowired
    private Jogos blackjackService; // Seu service existente

    @Autowired
    private PartidaRepository partidaRepository; // Injetando o banco de dados

    // Método auxiliar para checar e salvar se o jogo acabou
    private void salvarPartidaSeFimDeJogo(GameResponseDTO response) {
        if (response.isGameOver()) { // Altere para getIsGameOver() caso seu método use a nomenclatura clássica
            Partida novaPartida = new Partida(
                    response.getPlayerScore(),
                    response.getDealerScore(),
                    response.getGameStatus()
            );
            partidaRepository.save(novaPartida);
            System.out.println("💾 Partida salva com sucesso no banco Postgres!");
        }
    }

    @PostMapping("/start")
    public GameResponseDTO startNewGame() {
        // O start limpa o jogo, então apenas retorna a resposta inicial
        return blackjackService.startNewGame();
    }

    @PostMapping("/hit")
    public GameResponseDTO hitCard() {
        GameResponseDTO response = blackjackService.handleHit();
        salvarPartidaSeFimDeJogo(response); // <--- Chama a verificação aqui
        return response;
    }

    @PostMapping("/stand")
    public GameResponseDTO standGame() {
        GameResponseDTO response = blackjackService.handleStand();
        salvarPartidaSeFimDeJogo(response); // <--- Chama a verificação aqui
        return response;
    }
}