package in.AY.JS.Backend.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import in.AY.JS.Backend.Problem.Entity.Problem;
import in.AY.JS.Backend.Problem.Entity.ProblemCategory;
import in.AY.JS.Backend.Problem.Entity.ProblemGroup;
import in.AY.JS.Backend.Problem.Entity.ProblemGroupAI;
import in.AY.JS.Backend.Problem.Entity.ProblemGroupMember;
import in.AY.JS.Backend.Problem.Entity.ProblemReport;
import in.AY.JS.Backend.Problem.Entity.ProblemReportImage;
import in.AY.JS.Backend.Problem.Payload.ProblemCategoryDto;
import in.AY.JS.Backend.Problem.Payload.ProblemDto;
import in.AY.JS.Backend.Problem.Payload.ProblemGroupAIDto;
import in.AY.JS.Backend.Problem.Payload.ProblemGroupDto;
import in.AY.JS.Backend.Problem.Payload.ProblemGroupMemberDto;
import in.AY.JS.Backend.Problem.Payload.ProblemReportDto;
import in.AY.JS.Backend.Problem.Payload.ProblemReportImageDto;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {

        ModelMapper mm = new ModelMapper();


        // =========================================
        // ProblemCategory -> ProblemCategoryDto
        // =========================================

        TypeMap<ProblemCategory, ProblemCategoryDto> categoryMap =
                mm.createTypeMap(
                        ProblemCategory.class,
                        ProblemCategoryDto.class
                );

                categoryMap.setPostConverter(context -> {
                        ProblemCategory source = context.getSource();
                        ProblemCategoryDto destination = context.getDestination();
                        if (source.getLevel() != null) {
                                destination.setLevel(source.getLevel().name());
                        }
                        return destination;
                });


        // =========================================
        // Problem -> ProblemDto
        // =========================================

        TypeMap<Problem, ProblemDto> problemMap =
                mm.createTypeMap(
                        Problem.class,
                        ProblemDto.class
                );

        /*
         * category.id -> categoryId
         */
        problemMap.setPostConverter(context -> {
                        Problem source = context.getSource();
            ProblemDto destination = context.getDestination();
                        if (source.getCategory() != null) {
                                destination.setCategoryId(source.getCategory().getId());
                        }
            return destination;
        });


        // =========================================
        // ProblemReport -> ProblemReportDto
        // =========================================

        TypeMap<ProblemReport, ProblemReportDto> reportMap =
                mm.createTypeMap(
                        ProblemReport.class,
                        ProblemReportDto.class
                );

                reportMap.setPostConverter(context -> {
                        ProblemReport source = context.getSource();
                        ProblemReportDto destination = context.getDestination();
                        if (source.getProblem() != null) {
                                destination.setProblemId(source.getProblem().getId());
                        }
                        if (source.getUser() != null) {
                                destination.setUserId(source.getUser().getId());
                        }
                        return destination;
                });


        // =========================================
        // ProblemReportImage -> DTO
        // =========================================

        TypeMap<ProblemReportImage, ProblemReportImageDto> imageMap =
                mm.createTypeMap(
                        ProblemReportImage.class,
                        ProblemReportImageDto.class
                );

                imageMap.setPostConverter(context -> {
                        ProblemReportImage source = context.getSource();
                        ProblemReportImageDto destination = context.getDestination();
                        if (source.getReport() != null) {
                                destination.setReportId(source.getReport().getId());
                        }
                        return destination;
                });
                
             // =========================================
                // ProblemGroup -> ProblemGroupDto
                // =========================================
                // members, aiSummaries match automatically by property name
                // (each element converted via the TypeMaps below).
                mm.createTypeMap(ProblemGroup.class, ProblemGroupDto.class);


                // =========================================
                // ProblemGroupMember -> ProblemGroupMemberDto
                // =========================================

                TypeMap<ProblemGroupMember, ProblemGroupMemberDto> memberMap =
                        mm.createTypeMap(
                                ProblemGroupMember.class,
                                ProblemGroupMemberDto.class
                        );

                memberMap.setPostConverter(context -> {
                    ProblemGroupMember source = context.getSource();
                    ProblemGroupMemberDto destination = context.getDestination();
                    if (source.getGroup() != null) {
                        destination.setGroupId(source.getGroup().getId());
                    }
                    if (source.getProblemReport() != null) {
                        destination.setProblemReportId(source.getProblemReport().getId());
                    }
                    return destination;
                });


                // =========================================
                // ProblemGroupAI -> ProblemGroupAIDto
                // =========================================

                TypeMap<ProblemGroupAI, ProblemGroupAIDto> aiMap =
                        mm.createTypeMap(
                                ProblemGroupAI.class,
                                ProblemGroupAIDto.class
                        );

                aiMap.setPostConverter(context -> {
                    ProblemGroupAI source = context.getSource();
                    ProblemGroupAIDto destination = context.getDestination();
                    if (source.getGroup() != null) {
                        destination.setGroupId(source.getGroup().getId());
                    }
                    return destination;
                });


        return mm;
    }
}