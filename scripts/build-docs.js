#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class DocsBuilder {
  constructor() {
    this.docsDir = 'docs';
    this.templatesDir = path.join(this.docsDir, 'templates');
    this.sharedDir = path.join(this.templatesDir, 'shared');
  }

  async buildDocs() {
    console.log('Building documentation from templates...');
    
    // Process specific source files to output files
    const sourceFiles = [
      { source: path.join(this.templatesDir, 'api-reference-source.md'), output: 'api-reference.md' }
    ];
    
    for (const { source, output } of sourceFiles) {
      const sourcePath = source; // Source path is already absolute
      const outputPath = path.join(this.docsDir, output);
      
      if (fs.existsSync(sourcePath)) {
        await this.processFileToOutput(sourcePath, outputPath);
      } else {
        console.warn(`⚠️  Source file not found: ${source}`);
      }
    }
    
    console.log('Documentation build complete!');
  }

  async processFileToOutput(sourcePath, outputPath) {
    let content = fs.readFileSync(sourcePath, 'utf8');
    let modified = false;
    
    // Find all {% include %} statements
    const includeRegex = /\{%\s*include\s+([^%]+)\s*%\}/g;
    let match;
    
    while ((match = includeRegex.exec(content)) !== null) {
      const includePath = match[1].trim();
      const fullIncludePath = path.join(this.templatesDir, includePath);
      
      if (fs.existsSync(fullIncludePath)) {
        const includeContent = fs.readFileSync(fullIncludePath, 'utf8');
        content = content.replace(match[0], includeContent);
        modified = true;
        console.log(`  ✓ Injected: ${includePath} into ${path.basename(outputPath)}`);
      } else if (includePath.includes('-summary.md')) {
        // Generate summary dynamically from detailed file
        const detailedPath = includePath.replace('-summary.md', '-detailed.md');
        const fullDetailedPath = path.join(this.templatesDir, detailedPath);
        
        if (fs.existsSync(fullDetailedPath)) {
          // Extract UI location context from surrounding content
          const context = this.extractContext(content, match.index);
          const summaryContent = this.generateSummary(fullDetailedPath, context);
          content = content.replace(match[0], summaryContent);
          modified = true;
          console.log(`  ✓ Generated summary from: ${detailedPath} into ${path.basename(outputPath)}`);
        } else {
          console.warn(`  ⚠ Detailed file not found for summary: ${fullDetailedPath}`);
        }
      } else {
        console.warn(`  ⚠ Include file not found: ${fullIncludePath}`);
      }
    }
    
    // Write to output file
    fs.writeFileSync(outputPath, content);
    console.log(`  📝 Generated: ${path.basename(outputPath)}`);
  }

  generateSummary(detailedFilePath, context = {}) {
    const content = fs.readFileSync(detailedFilePath, 'utf8');
    const methods = this.extractMethods(content);
    const objectName = this.getObjectName(detailedFilePath);
    
    if (methods.length === 0) {
      return '**Available Methods:**\n- No methods available';
    }
    
    const summaryLines = [];
    
    // Add usage example at the top with context
    const usageExample = this.getUsageExample(objectName, content, context);
    if (usageExample) {
      summaryLines.push(usageExample);
      summaryLines.push(''); // Empty line
    }
    
    summaryLines.push('**Available Methods:**');
    
    methods.forEach(method => {
      // Use the actual anchor from the detailed file
      const methodName = typeof method === 'string' ? method : method.name;
      const anchor = typeof method === 'string' ? 
        methodName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') :
        method.anchor;
      summaryLines.push(`- [${methodName}](#${anchor}) - ${this.getMethodDescription(methodName, content)}`);
    });
    
    return summaryLines.join('\n');
  }

  extractMethods(content) {
    const methods = [];
    
    // Look for methods section specifically
    const methodsSection = content.match(/### Methods\s*([\s\S]*?)(?=### Properties|$)/);
    if (methodsSection) {
      const methodRegex = /#### \[([^\]]+)\]\(#([^)]+)\)/g;
      let match;
      
      while ((match = methodRegex.exec(methodsSection[1])) !== null) {
        methods.push({
          name: match[1],
          anchor: match[2]
        });
      }
    }
    
    return methods;
  }

  getObjectName(detailedFilePath) {
    const filename = path.basename(detailedFilePath, '-detailed.md');
    return filename.charAt(0).toUpperCase() + filename.slice(1);
  }

  getUsageExample(objectName, content, context = {}) {
    // Get the UI location context from the surrounding content
    const uiLocation = this.extractUILocation(context);
    const locationVar = this.getLocationVariable(uiLocation);
    
    // Define usage examples for each object type with contextual access
    const usageExamples = {
      'Entry': `\`\`\`ts\n// Get entry data and listen for changes\nconst entryData = ${locationVar}.entry.getData();\n${locationVar}.entry.onChange((data) => {\n  console.log('Entry changed:', data);\n});\n\`\`\``,
      'Field': `\`\`\`ts\n// Get and set field data\nconst fieldData = ${locationVar}.field.getData();\n${locationVar}.field.setData({ title: 'New Title' });\n\`\`\``,
      'Stack': `\`\`\`ts\n// Get content types and entries\nconst contentTypes = await ${locationVar}.stack.getContentTypes();\nconst entries = await ${locationVar}.stack.getEntries('blog_post');\n\`\`\``,
      'Store': `\`\`\`ts\n// Store and retrieve app data\n${locationVar}.store.set('user_preferences', { theme: 'dark' });\nconst preferences = ${locationVar}.store.get('user_preferences');\n\`\`\``
    };
    
    return usageExamples[objectName] || null;
  }

  extractContext(content, matchIndex) {
    // Look backwards from the match to find the UI location section
    const beforeMatch = content.substring(0, matchIndex);
    const lines = beforeMatch.split('\n').reverse();
    
    // Look for the most recent UI location heading
    for (const line of lines) {
      if (line.startsWith('### ') && !line.includes('Object')) {
        const uiLocation = line.replace('### ', '').trim();
        return { uiLocation };
      }
    }
    
    return {};
  }

  extractUILocation(context) {
    // Try to extract UI location from context
    if (context.uiLocation) {
      return context.uiLocation;
    }
    
    // Fallback: try to detect from the content being processed
    // This is a simplified approach - in practice, we'd need more context
    return 'widget'; // Default fallback
  }

  getLocationVariable(uiLocation) {
    // Map UI locations to their variable names
    const locationVars = {
      'AssetSidebarWidget': 'assetSidebar',
      'ContentTypeSidebarWidget': 'contentTypeSidebar', 
      'CustomField': 'customField',
      'DashboardWidget': 'dashboard',
      'FieldModifierLocation': 'fieldModifier',
      'FullPage': 'fullPage',
      'AppConfigWidget': 'appConfig',
      'GlobalFullPageLocation': 'globalFullPage',
      'RTELocation': 'rteLocation',
      'SidebarWidget': 'sidebar'
    };
    
    return locationVars[uiLocation] || 'widget';
  }

  getMethodDescription(method, content) {
    // Try to extract a brief description for the method
    const methodRegex = new RegExp(`#### \\[${method.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]\\(#[^)]+\\)\\s*([^\\n]+)`, 'i');
    const match = content.match(methodRegex);
    
    if (match && match[1]) {
      // Clean up the description
      let description = match[1].trim();
      // Remove common prefixes and make it shorter
      description = description.replace(/^(Gets?|Sets?|Retrieves?|Returns?|Executes?|Provides?)\s+/i, '');
      description = description.replace(/\.$/, ''); // Remove trailing period
      return description || 'Method description';
    }
    
    return 'Method description';
  }
}

// Run if called directly
if (require.main === module) {
  const builder = new DocsBuilder();
  builder.buildDocs().catch(console.error);
}

module.exports = DocsBuilder;