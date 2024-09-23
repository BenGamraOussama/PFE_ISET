package com.PFE.commerce.beans;

public class AffectationCommandeDto {
    private  Long id;
    private LivreurDto livreurDto;
    private CommandeDto commandeDto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LivreurDto getLivreurDto() {
        return livreurDto;
    }

    public void setLivreurDto(LivreurDto livreurDto) {
        this.livreurDto = livreurDto;
    }

    public CommandeDto getCommandeDto() {
        return commandeDto;
    }

    public void setCommandeDto(CommandeDto commandeDto) {
        this.commandeDto = commandeDto;
    }

    public AffectationCommandeDto(LivreurDto livreurDto, CommandeDto commandeDto) {
        this.livreurDto = livreurDto;
        this.commandeDto = commandeDto;
    }

    public AffectationCommandeDto() {
    }

    @Override
    public String toString() {
        return "AffectationCommandeDto{" +
                "livreurDto=" + livreurDto +
                ", commandeDto=" + commandeDto +
                '}';
    }
}
