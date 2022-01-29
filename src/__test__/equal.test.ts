import {
  isDate,
  isEmpty, isJSON, isNotEmpty, isIP, regPattern, strictEqual
} from '../equal';

test('strictEqual', () => {
  expect(strictEqual(123, 123)).toBeTruthy();
  expect(strictEqual(123,'123')).toBeFalsy();
  expect(strictEqual({name: 'jack'}, {name: 'jack'})).toBeTruthy();
  expect(strictEqual(['jack'], ['jack'])).toBeTruthy();
});

test('regPattern', () => {
  expect(new RegExp(regPattern.email).test('jack@mail.com')).toBeTruthy();
  expect(new RegExp(regPattern.email).test('jack.com')).toBeFalsy();
  expect(new RegExp(regPattern.number).test('123456')).toBeTruthy();
  expect(new RegExp(regPattern.number).test('a123456')).toBeFalsy();
  expect(new RegExp(regPattern.number).test('123456b')).toBeFalsy();
  expect(new RegExp(regPattern.number).test('123v456b')).toBeFalsy();
});

test('isEmpty', () => {
  expect(isEmpty('')).toBeTruthy();
  expect(isEmpty({})).toBeTruthy();
  expect(isEmpty(0, {isZero: true})).toBeTruthy();
  expect(isEmpty('0', {isZero: true})).toBeTruthy();
  expect(isEmpty(0, {isZero: false})).toBeFalsy();
  expect(isEmpty('0', {isZero: false})).toBeFalsy();
  expect(isEmpty('false', {isFalse: true})).toBeTruthy();
  expect(isEmpty(false, {isFalse: true})).toBeTruthy();
  expect(isEmpty('false', {isFalse: false})).toBeFalsy();
  expect(isEmpty(false, {isFalse: false})).toBeFalsy();
  expect(isEmpty([])).toBeTruthy();
  expect(isEmpty(null)).toBeTruthy();
  expect(isEmpty(undefined)).toBeTruthy();
  expect(isEmpty('helloWorld')).toBeFalsy();
});


test('isNotEmpty', () => {
  expect(isNotEmpty('')).toBeFalsy();
  expect(isNotEmpty(0, {isZero: true})).toBeFalsy();
  expect(isNotEmpty('0', {isZero: true})).toBeFalsy();
  expect(isNotEmpty(0, {isZero: false})).toBeTruthy();
  expect(isNotEmpty('0', {isZero: false})).toBeTruthy();
  expect(isNotEmpty('false', {isFalse: true})).toBeFalsy();
  expect(isNotEmpty(false, {isFalse: true})).toBeFalsy();
  expect(isNotEmpty('false', {isFalse: false})).toBeTruthy();
  expect(isNotEmpty(false, {isFalse: false})).toBeTruthy();
  expect(isNotEmpty([])).toBeFalsy();
  expect(isNotEmpty(null)).toBeFalsy();
  expect(isNotEmpty(undefined)).toBeFalsy();
  expect(isNotEmpty('helloWorld')).toBeTruthy();
});


test('isDate', () => {
  expect(isDate('2022-01-09')).toBeTruthy();
  expect(isDate('2022.01.09')).toBeTruthy();
  expect(isDate('2022/01/09')).toBeTruthy();
  expect(isDate('20220109')).toBeFalsy();
  expect(isDate('2022/13/40')).toBeFalsy();
  expect(isDate('helloWorld')).toBeFalsy();
});


test('isIp', () => {
  expect(isIP('192.168.1.10')).toBeTruthy();
  expect(isIP('192.168.299.299')).toBeFalsy();
  expect(isIP('a.d.12312')).toBeFalsy();
});


test('isJSON', () => {
  const jsonString = JSON.stringify({name: 'jack'});
  const jsonErrorString = "{name:_'jack'}";

  expect(isJSON(jsonString)).toBeTruthy();
  expect(isJSON(jsonErrorString)).toBeFalsy();
});
