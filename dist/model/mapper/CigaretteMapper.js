"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cigarette_1 = require("../entity/Cigarette");
class CigaretteMapper {
    static mapMany(user, request) {
        if (request.body && user) {
            const cigarettes = request.body.cigarettes;
            console.log('request.body=', JSON.stringify(request.body));
            if (cigarettes && cigarettes.length > 0) {
                const results = [];
                cigarettes.forEach((cigarette) => {
                    results.push(CigaretteMapper.mapOne(user, cigarette));
                });
                return results;
            }
        }
        return [];
    }
    static mapOne(user, input) {
        const cigarette = new Cigarette_1.default();
        if (input.creationDate) {
            cigarette.creationDate = input.creationDate;
        }
        if (user) {
            cigarette.user = user;
        }
        if (input.sentiment) {
            cigarette.sentiment = CigaretteMapper.mapSentiment(input.sentiment.toString());
        }
        if (input.coords && input.coords.lng && input.coords.lat) {
            cigarette.coords = input.coords;
        }
        cigarette.creationDate = new Date();
        return cigarette;
    }
    static mapSentiment(input) {
        if (input) {
            switch (input.toLowerCase()) {
                case 'happy':
                    return Cigarette_1.Sentiment.HAPPY;
                case 'not-happy':
                    return Cigarette_1.Sentiment.NOT_HAPPY;
                case 'nervous':
                    return Cigarette_1.Sentiment.NERVOUS;
                case 'chilling':
                    return Cigarette_1.Sentiment.CHILLING;
                case 'drunk':
                    return Cigarette_1.Sentiment.DRUNK;
                case 'sick':
                    return Cigarette_1.Sentiment.SICK;
                default:
                    return null;
            }
        }
        return null;
    }
}
exports.default = CigaretteMapper;
