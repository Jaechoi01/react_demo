package com.simple.demo.data.common.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SingleResult<T>  extends BaseResult{

    @Schema(description = "데이터")
    private T data;
}
