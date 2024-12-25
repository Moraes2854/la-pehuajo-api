import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength, IsBoolean } from "class-validator";
import { Transform, Type } from "class-transformer";

const optionalBooleanMapper = new Map([
    ['undefined', undefined],
    ['true', true],
    ['false', false],
]);

export class FindProductDto {
    @ApiProperty({
        description: 'Name of product',
        required: false,
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    name?: string;


    @ApiProperty({
        description: 'price of product',
        required: false,
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    price?: number;

    @ApiProperty({
        description: 'promotional price pesos of product',
        required: false,
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    promotionalPrice?: number;

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if ( value === 'true' ) return true;
        if ( value === 'false' ) return false;
        return value;
    })
    isAvailable?: boolean;

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if ( value === 'true' ) return true;
        if ( value === 'false' ) return false;
        return value;
    })
    isDeleted?: boolean;

}
