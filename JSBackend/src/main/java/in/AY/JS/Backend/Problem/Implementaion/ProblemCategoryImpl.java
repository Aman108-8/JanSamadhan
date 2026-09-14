package in.AY.JS.Backend.Problem.Implementaion;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.AY.JS.Backend.Problem.Entity.ProblemCategory;
import in.AY.JS.Backend.Problem.Payload.ProblemCategoryDto;
import in.AY.JS.Backend.Problem.Repo.ProblemCategoryRepo;
import in.AY.JS.Backend.Problem.Service.ProblemCategoryService;

@Service
public class ProblemCategoryImpl implements ProblemCategoryService {

    @Autowired
    private ProblemCategoryRepo problemCategoryRepo;

    @Override
    public List<ProblemCategoryDto> getAllCategories() {
        return problemCategoryRepo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private ProblemCategoryDto toDto(ProblemCategory category) {
        ProblemCategoryDto dto = new ProblemCategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setLevel(category.getLevel().name());
        return dto;
    }
}