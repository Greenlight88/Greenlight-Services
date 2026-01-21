/**
 * Make.com Blueprint Processor
 * Extracts only essential data for replicating logic in code
 *
 * Usage: node blueprint-processor.js <input.json> [output.json]
 */

const fs = require('fs');
const path = require('path');

function extractEssentials(blueprint) {
    const result = {
        name: blueprint.name || 'Unknown',
        modules: [],
        flow: []
    };

    // Handle different blueprint structures
    const flow = blueprint.flow || blueprint;
    const modules = flow.modules || flow;

    if (!Array.isArray(modules)) {
        // Try to find modules in nested structure
        if (blueprint.scenario && blueprint.scenario.flow) {
            return extractEssentials({ flow: blueprint.scenario.flow });
        }
        console.error('Could not find modules array in blueprint');
        return result;
    }

    modules.forEach(module => {
        const extracted = extractModule(module);
        if (extracted) {
            result.modules.push(extracted);
        }
    });

    return result;
}

function extractModule(module) {
    if (!module) return null;

    const extracted = {
        id: module.id,
        name: module.name || module.module,
        type: module.module
    };

    // Extract mapper (the key configuration)
    if (module.mapper) {
        extracted.config = extractMapper(module.mapper);
    }

    // Extract parameters
    if (module.parameters) {
        extracted.parameters = extractParameters(module.parameters);
    }

    // Extract routes (for routers)
    if (module.routes) {
        extracted.routes = module.routes.map(route => ({
            name: route.name,
            flow: route.flow ? route.flow.map(m => extractModule(m)).filter(Boolean) : [],
            filter: route.filter ? extractFilter(route.filter) : null
        }));
    }

    // Extract nested flow
    if (module.flow && Array.isArray(module.flow)) {
        extracted.flow = module.flow.map(m => extractModule(m)).filter(Boolean);
    }

    // Clean up empty objects
    if (extracted.config && Object.keys(extracted.config).length === 0) {
        delete extracted.config;
    }

    return extracted;
}

function extractMapper(mapper) {
    const config = {};

    // Object ID
    if (mapper.object_id) {
        config.object_id = mapper.object_id;
    }

    // Filters
    if (mapper.filters && mapper.filters.length > 0) {
        config.filters = mapper.filters;
        config.match = mapper.match || 'and';
    }

    // Limit
    if (mapper.limit) {
        config.limit = mapper.limit;
    }

    // Sort
    if (mapper.sort_field) {
        config.sort = {
            field: mapper.sort_field,
            order: mapper.sort_order || 'asc'
        };
    }

    // Field mappings (only field IDs being set, not values)
    const fieldMappings = {};
    Object.keys(mapper).forEach(key => {
        if (key.startsWith('field_')) {
            const value = mapper[key];
            // Only include if it's a meaningful mapping
            if (value !== null && value !== undefined && value !== '') {
                // Summarize the mapping
                if (typeof value === 'string' && value.includes('{{')) {
                    fieldMappings[key] = value; // Keep template references
                } else if (typeof value === 'object') {
                    fieldMappings[key] = '[object]';
                } else if (typeof value === 'boolean') {
                    fieldMappings[key] = value;
                } else {
                    fieldMappings[key] = String(value).substring(0, 100); // Truncate long values
                }
            }
        }
    });

    if (Object.keys(fieldMappings).length > 0) {
        config.fields = fieldMappings;
    }

    // Body content (for webhooks)
    if (mapper.body) {
        config.body = summarizeBody(mapper.body);
    }

    // URL (for HTTP modules)
    if (mapper.url) {
        config.url = mapper.url;
    }

    // Method
    if (mapper.method) {
        config.method = mapper.method;
    }

    return config;
}

function extractParameters(params) {
    const extracted = {};

    if (params.hook) {
        extracted.hook = params.hook;
    }

    if (params.object_id) {
        extracted.object_id = params.object_id;
    }

    return Object.keys(extracted).length > 0 ? extracted : null;
}

function extractFilter(filter) {
    if (!filter) return null;

    // Simplify filter structure
    if (filter.conditions) {
        return {
            match: filter.match || 'and',
            conditions: filter.conditions.map(c => ({
                field: c.a,
                operator: c.o,
                value: c.b
            }))
        };
    }

    return filter;
}

function summarizeBody(body) {
    if (typeof body === 'string') {
        // Try to parse as JSON to extract field references
        try {
            const parsed = JSON.parse(body);
            return extractFieldReferences(parsed);
        } catch {
            // Return truncated string with field references highlighted
            const refs = body.match(/\{\{[^}]+\}\}/g) || [];
            return {
                type: 'string',
                length: body.length,
                fieldReferences: refs.slice(0, 20) // First 20 references
            };
        }
    }
    return body;
}

function extractFieldReferences(obj, refs = new Set()) {
    if (typeof obj === 'string') {
        const matches = obj.match(/\{\{[^}]+\}\}/g) || [];
        matches.forEach(m => refs.add(m));
    } else if (Array.isArray(obj)) {
        obj.forEach(item => extractFieldReferences(item, refs));
    } else if (obj && typeof obj === 'object') {
        Object.values(obj).forEach(val => extractFieldReferences(val, refs));
    }
    return Array.from(refs);
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: node blueprint-processor.js <input.json> [output.json]');
    console.log('');
    console.log('Or pipe JSON directly:');
    console.log('  echo \'{"modules":[...]}\' | node blueprint-processor.js');

    // Read from stdin if available
    let input = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
        let chunk;
        while (chunk = process.stdin.read()) {
            input += chunk;
        }
    });
    process.stdin.on('end', () => {
        if (input.trim()) {
            try {
                const blueprint = JSON.parse(input);
                const result = extractEssentials(blueprint);
                console.log(JSON.stringify(result, null, 2));
            } catch (e) {
                console.error('Error parsing JSON:', e.message);
            }
        }
    });
} else {
    const inputFile = args[0];
    const outputFile = args[1];

    try {
        const blueprint = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
        const result = extractEssentials(blueprint);
        const output = JSON.stringify(result, null, 2);

        if (outputFile) {
            fs.writeFileSync(outputFile, output);
            console.log(`Processed blueprint saved to: ${outputFile}`);
            console.log(`Original size: ${fs.statSync(inputFile).size} bytes`);
            console.log(`Processed size: ${output.length} bytes`);
            console.log(`Reduction: ${Math.round((1 - output.length / fs.statSync(inputFile).size) * 100)}%`);
        } else {
            console.log(output);
        }
    } catch (e) {
        console.error('Error:', e.message);
        process.exit(1);
    }
}
