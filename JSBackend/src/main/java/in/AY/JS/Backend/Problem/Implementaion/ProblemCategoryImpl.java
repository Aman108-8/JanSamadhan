package in.AY.JS.Backend.Problem.Implementaion;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.AY.JS.Backend.Problem.Payload.ProblemCategoryDto;
import in.AY.JS.Backend.Problem.Repo.ProblemCategoryRepo;
import in.AY.JS.Backend.Problem.Service.ProblemCategoryService;

@Service
public class ProblemCategoryImpl implements ProblemCategoryService {

    @Autowired
    private ProblemCategoryRepo problemCategoryRepo;

    @Autowired
    private ModelMapper mm;


    @Override
    public List<ProblemCategoryDto> getAllCategories() {

        return problemCategoryRepo.findAll()
                .stream()
                .map(category -> mm.map(category, ProblemCategoryDto.class))
                .collect(Collectors.toList());
    }
}