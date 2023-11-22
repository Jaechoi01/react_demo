package com.simple.demo.data.common.dto;

//import io.swagger.annotations.ApiModel;
//import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class BaseResult {
    //https://www.bezkoder.com/swagger-3-annotations/#Swagger_3_Parameter_annotation
    // 해당 문서에서 어노테이션 참고.
    @Schema(description = "응답성공여부", example = "true")
    private boolean sucess;

    @Schema(description = "응답코드", example = "0")
    private int code;

    @Schema(description = "응답메시지", example = "")
    private String message;

}
