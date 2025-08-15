import type { Response } from 'express';
import type { ServerResponse } from 'shared-types';

interface ResponseHandler {
  sendResponse: <T>(
    statusCode: number,
    message?: string,
    data?: T | null
  ) => void;
  ok: <T>(message?: string, data?: T | null) => void;
  badRequest: <T>(message?: string, data?: T | null) => void;
  unauthorized: <T>(message?: string, data?: T | null) => void;
  notFound: <T>(message?: string, data?: T | null) => void;
  forbidden: <T>(message?: string, data?: T | null) => void;
  internalServerError: <T>(message?: string, data?: T | null) => void;
}

function buildResponse<T>(
  message?: string,
  data?: T | null
): ServerResponse<T> {
  return {
    message,
    data
  };
}

export default function useServerResponse(res: Response): ResponseHandler {
  function sendResponse<T>(
    statusCode: number,
    message?: string,
    data?: T | null
  ) {
    res.status(statusCode).json(buildResponse(message, data));
  }

  function ok<T>(message?: string, data?: T | null) {
    res.status(200).json(buildResponse(message, data));
  }

  function badRequest<T>(message?: string, data?: T | null) {
    res.status(400).json(buildResponse(message, data));
  }

  function unauthorized<T>(message?: string, data?: T | null) {
    res.status(401).json(buildResponse(message, data));
  }

  function notFound<T>(message?: string, data?: T | null) {
    res.status(404).json(buildResponse(message, data));
  }

  function forbidden<T>(message?: string, data?: T | null) {
    res.status(403).json(buildResponse(message, data));
  }

  function internalServerError<T>(message?: string, data?: T | null) {
    res.status(500).json(buildResponse(message, data));
  }

  return {
    sendResponse,
    ok,
    badRequest,
    unauthorized,
    notFound,
    forbidden,
    internalServerError
  };
}
