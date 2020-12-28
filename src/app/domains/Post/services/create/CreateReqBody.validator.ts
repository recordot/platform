/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import CreateReqBody from './CreateReqBody';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {CreateReqBody};
export const CreateReqBodySchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "defaultProperties": [
  ],
  "properties": {
    "content": {
      "type": "string"
    },
    "title": {
      "type": "string"
    }
  },
  "required": [
    "content",
    "title"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isCreateReqBody = ajv.compile(CreateReqBodySchema) as ValidateFunction<CreateReqBody>;
export default function validate(value: unknown): CreateReqBody {
  if (isCreateReqBody(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isCreateReqBody.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'CreateReqBody'}) +
      '\n\n' +
      inspect(value),
    );
  }
}