package com.simple.demo.common;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode implements EnumModel {

    // 에러 간격을 위해 10000단위로 끊음..
    // COMMON 10000
    INVALID_CODE( 10001, "잘못된 코드 입니다."),
    RESOURCE_NOT_FOUND( 10002, "리소스를 찾을수 없습니다."),

    // User, Auth 20000
    USER_NOT_EXIST( 20001, "사용자가 존재하지 않습니다."),
    USER_WRONG_PASSWORD( 20002, "잘못된 패스워드 입니다."),
    USER_NO_PERMISSION(2003, "권한이 없습니다.");


    private int code;
    private String message;

    ErrorCode(int code, String message) {
        this.message = message;
        this.code = code;
    }

    @Override
    public int getKey() {
        return this.code;
    }

    @Override
    public String getValue() {
        return this.message;
    }
}