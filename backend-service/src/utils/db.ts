// const { PrismaClient } = require('@prisma/client');
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

module.exports = { db };
