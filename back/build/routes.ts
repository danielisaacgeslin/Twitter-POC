/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { iocContainer } from './../src/ioc';
import { TwitterController } from './../src/controllers/TwitterController';
import { PingController } from './../src/controllers/PingController';
import { expressAuthentication } from './../src/auth';

const models: TsoaRoute.Models = {
    "TweetModel": {
    },
    "TweetsResponseModel": {
        "properties": {
            "statuses": { "dataType": "array", "array": { "ref": "TweetModel" }, "required": true },
            "search_metadata": { "dataType": "any", "required": true },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/twitter',
        function(request: any, response: any, next: any) {
            const args = {
                query: { "in": "query", "name": "query", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<TwitterController>(TwitterController);


            const promise = controller.getById.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/ping',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<PingController>(PingController);


            const promise = controller.ping.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });


    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controller.getStatus();
                }

                if (data) {
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
