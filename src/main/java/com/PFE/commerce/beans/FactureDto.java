package com.PFE.commerce.beans;

import java.util.List;

public class FactureDto {
    private Long id;
    private CommandeDto commandeDto;
    private List<CommandeMatieresDto> commandeMatieresDtoList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CommandeDto getCommandeDto() {
        return commandeDto;
    }

    public void setCommandeDto(CommandeDto commandeDto) {
        this.commandeDto = commandeDto;
    }

    public List<CommandeMatieresDto> getCommandeMatieresDtoList() {
        return commandeMatieresDtoList;
    }

    public void setCommandeMatieresDtoList(List<CommandeMatieresDto> commandeMatieresDtoList) {
        this.commandeMatieresDtoList = commandeMatieresDtoList;
    }

    public FactureDto(CommandeDto commandeDto, List<CommandeMatieresDto> commandeMatieresDtoList) {
        this.commandeDto = commandeDto;
        this.commandeMatieresDtoList = commandeMatieresDtoList;
    }

    public FactureDto() {
    }
}
