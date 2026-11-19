package in.AY.JS.Backend.Problem.Service;

import java.util.List;

import in.AY.JS.Backend.Problem.Payload.ProblemCategoryDto;

public interface ProblemCategoryService 
{
	List<ProblemCategoryDto> getAllCategories();
}
