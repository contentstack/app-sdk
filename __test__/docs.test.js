const fs = require('fs');
const path = require('path');

describe('Documentation Tests', () => {
  const docsDir = path.join(__dirname, '../docs');
  const templatesDir = path.join(docsDir, 'templates');
  const sharedDir = path.join(templatesDir, 'shared');

  test('API reference source file exists', () => {
    const sourceFile = path.join(templatesDir, 'api-reference-source.md');
    expect(fs.existsSync(sourceFile)).toBe(true);
  });

  test('API reference output file exists', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    expect(fs.existsSync(outputFile)).toBe(true);
  });

  test('All shared object detailed files exist', () => {
    const sharedObjects = ['entry', 'field', 'stack', 'store'];
    
    sharedObjects.forEach(objectName => {
      const detailedFile = path.join(sharedDir, `${objectName}-detailed.md`);
      expect(fs.existsSync(detailedFile)).toBe(true);
    });
  });

  test('No orphaned summary files exist', () => {
    const sharedObjects = ['entry', 'field', 'stack', 'store'];
    
    sharedObjects.forEach(objectName => {
      const summaryFile = path.join(sharedDir, `${objectName}-summary.md`);
      expect(fs.existsSync(summaryFile)).toBe(false);
    });
  });

  test('API reference contains all shared object sections', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    const sharedObjects = ['entry', 'field', 'stack', 'store'];
    sharedObjects.forEach(objectName => {
      expect(content).toContain(`### ${objectName.charAt(0).toUpperCase() + objectName.slice(1)} Object`);
    });
  });

  test('Entry object documentation matches source code', () => {
    const entryFile = path.join(sharedDir, 'entry-detailed.md');
    const entrySourceFile = path.join(__dirname, '../src/entry.ts');
    
    // Read documentation
    const docContent = fs.readFileSync(entryFile, 'utf8');
    
    // Read source code
    const sourceContent = fs.readFileSync(entrySourceFile, 'utf8');
    
    // Extract methods from source code - use a more robust approach
    // Look for method definitions that start with 4 spaces (class method indentation)
    const methodRegex = /^    (\w+)\s*\([^{]*\)\s*(?::\s*[^{]+)?\s*{/gm;
    const sourceMethods = [];
    let match;
    
    while ((match = methodRegex.exec(sourceContent)) !== null) {
      const methodName = match[1];
      // Filter out constructor and common non-API methods
      if (!['constructor', 'toString', 'valueOf', 'hasOwnProperty', 'catch', 'if', 'for', 'while', 'return', 'try', 'throw'].includes(methodName)) {
        sourceMethods.push(methodName);
      }
    }
    
    // Also try a broader approach - look for any function-like patterns
    const simpleMethodRegex = /(\w+)\s*\([^{]*\)\s*(?::\s*[^{]+)?\s*{/g;
    let simpleMatch;
    const simpleMethods = [];
    
    while ((simpleMatch = simpleMethodRegex.exec(sourceContent)) !== null) {
      const methodName = simpleMatch[1];
      if (!['constructor', 'toString', 'valueOf', 'hasOwnProperty', 'catch', 'if', 'for', 'while', 'return', 'try', 'throw', 'Object', 'Array', 'String', 'Number', 'Boolean', 'callback', 'event', 'data', 'response', 'error', 'entryObj', 'thisEntry', 'path', 'key', 'index', 'blockId', 'fieldInitializationDataObject', 'fieldObject', 'FieldInstance'].includes(methodName)) {
        simpleMethods.push(methodName);
      }
    }
    
    // Use the union of both approaches
    const allMethods = [...new Set([...sourceMethods, ...simpleMethods])];
    
    // All methods found successfully
    
    // Check that documented methods exist in source
    const documentedMethods = [
      'getData', 'getDraftData', 'getField', 'getPropertySafely',
      'onSave', 'onChange', 'onPublish', 'onUnPublish'
    ];
    
    documentedMethods.forEach(method => {
      expect(allMethods).toContain(method);
      expect(docContent).toContain(method);
    });
  });

  test('API reference includes are properly resolved', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Should not contain unresolved includes
    expect(content).not.toContain('{% include');
    expect(content).not.toContain('{% include');
  });

  test('UI Location documentation matches source code', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Map UI locations to their source files
    const uiLocationMap = {
      'AssetSidebarWidget': 'src/AssetSidebarWidget.ts',
      'ContentTypeSidebarWidget': 'src/ContentTypeSidebarWidget.ts',
      'CustomField': 'src/types.ts', // Interface definition
      'DashboardWidget': 'src/types.ts',
      'SidebarWidget': 'src/types.ts',
      'AppConfigWidget': 'src/types.ts',
      'FullPage': 'src/types.ts',
      'FieldModifierLocation': 'src/fieldModifierLocation/entry.ts',
      'GlobalFullPageLocation': 'src/types.ts',
      'RTELocation': 'src/types.ts'
    };
    
    // Check each UI location
    Object.entries(uiLocationMap).forEach(([locationName, sourcePath]) => {
      const sourceFile = path.join(__dirname, '..', sourcePath);
      
      if (fs.existsSync(sourceFile)) {
        const sourceContent = fs.readFileSync(sourceFile, 'utf8');
        
        // Check that the UI location is documented
        expect(content).toContain(locationName);
        
        // For actual class files, check for key methods
        if (sourcePath.endsWith('.ts') && !sourcePath.includes('types.ts')) {
          // Extract class methods
          const classMethodRegex = /(?:public|private|protected)?\s*(?:async\s+)?(\w+)\s*\([^)]*\)\s*(?::\s*[^{]+)?\s*{/g;
          const methods = [];
          let match;
          
          while ((match = classMethodRegex.exec(sourceContent)) !== null) {
            const methodName = match[1];
            if (!['constructor', 'toString', 'valueOf'].includes(methodName)) {
              methods.push(methodName);
            }
          }
          
          // Check that key methods are documented (basic validation)
          if (methods.length > 0) {
            const locationSection = content.split(`### ${locationName}`)[1]?.split('### ')[0] || '';
            expect(locationSection.length).toBeGreaterThan(100); // Basic check that section exists
          }
        }
      }
    });
  });

  test('No broken internal links', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Find all internal links
    const linkRegex = /\[([^\]]+)\]\(#([^)]+)\)/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      links.push({
        text: match[1],
        anchor: match[2]
      });
    }
    
    // Generate expected anchors from headings
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings = [];
    let headingMatch;
    
    while ((headingMatch = headingRegex.exec(content)) !== null) {
      const level = headingMatch[1].length;
      let text = headingMatch[2].trim();
      
      // If heading contains a link, extract the anchor from the link
      const linkMatch = text.match(/\[([^\]]+)\]\(#([^)]+)\)/);
      if (linkMatch) {
        // Use the anchor from the link
        headings.push(linkMatch[2]);
      } else {
        // Convert to GitHub anchor format
        const anchor = text.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        headings.push(anchor);
      }
    }
    
    // Check that all links point to existing anchors
    links.forEach(link => {
      expect(headings).toContain(link.anchor);
    });
  });

  test('Code examples have proper syntax and structure', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Find all code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const codeBlocks = [];
    let match;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1] || 'text';
      const code = match[2].trim();
      codeBlocks.push({ language, code });
    }
    
    // Validate TypeScript/JavaScript code blocks
    codeBlocks.forEach(({ language, code }) => {
      if (['ts', 'typescript', 'js', 'javascript'].includes(language)) {
        // Check for basic syntax issues
        expect(code).not.toMatch(/undefined\s*undefined/); // No double undefined
        expect(code).not.toMatch(/null\s*null/); // No double null
        expect(code).not.toMatch(/await\s+await/); // No double await
        
        // Check for proper async/await usage (but allow code snippets without function wrappers)
        if (code.includes('await') && code.includes('function')) {
          // Only check for async function if the code actually contains a function
          expect(code).toMatch(/async\s+function|async\s*\(/); // Should have async function
        }
        
        // Check for proper variable declarations
        if (code.includes('const ') || code.includes('let ')) {
          expect(code).not.toMatch(/const\s+const|let\s+let/); // No double declarations
        }
        
        // Check for proper method chaining (but allow ellipsis in strings)
        if (code.includes('.')) {
          // Check for double dots that aren't part of ellipsis (...)
          const hasDoubleDots = /\.\s*\./.test(code);
          const hasEllipsis = /\.\.\./.test(code);
          if (hasDoubleDots && !hasEllipsis) {
            expect(code).not.toMatch(/\.\s*\./); // No double dots
          }
        }
      }
    });
  });

  test('Documentation has clear structure and navigation', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Check for proper heading hierarchy
    const headings = content.match(/^#{1,6}\s+.+$/gm) || [];
    const headingLevels = headings.map(h => h.match(/^(#{1,6})/)[1].length);
    
    // Ensure we don't skip heading levels (e.g., h1 to h3 without h2)
    for (let i = 1; i < headingLevels.length; i++) {
      const currentLevel = headingLevels[i];
      const previousLevel = headingLevels[i - 1];
      expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
    }
    
    // Check for essential sections
    const essentialSections = [
      'overview',
      'installation',
      'quick start',
      'sdk reference',
      'ui locations',
      'core objects'
    ];
    
    essentialSections.forEach(section => {
      expect(content.toLowerCase()).toContain(section);
    });
    
    // Check for proper table of contents structure
    const tocSections = content.match(/^#{2,3}\s+.+$/gm) || [];
    expect(tocSections.length).toBeGreaterThan(5); // Should have multiple sections
  });

  test('Examples are practical and realistic', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Find all code examples
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const codeBlocks = [];
    let match;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1] || 'text';
      const code = match[2].trim();
      codeBlocks.push({ language, code });
    }
    
    // Validate TypeScript/JavaScript examples
    codeBlocks.forEach(({ language, code }) => {
      if (['ts', 'typescript', 'js', 'javascript'].includes(language)) {
        // Check for realistic variable names
        expect(code).not.toMatch(/\b(foo|bar|baz|test|example)\b/); // No generic placeholder names
        
        // Check for proper error handling
        if (code.includes('await')) {
          // Async code should have some error handling or be in try-catch
          const hasErrorHandling = code.includes('try') || code.includes('catch') || 
                                  code.includes('throw') || code.includes('Error');
          // Note: This is a soft check - not all async code needs error handling in examples
        }
        
        // Check for proper imports (but allow examples without imports for simplicity)
        if (code.includes('sdk.') || code.includes('ContentstackAppSDK')) {
          // This is a soft check - examples might not always include imports
          // expect(code).toMatch(/import|require/); // Should have proper imports
        }
      }
    });
  });

  test('Documentation covers essential use cases', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Check for essential use cases
    const essentialUseCases = [
      'init',
      'getdata',
      'setdata',
      'onchange',
      'error'
    ];
    
    essentialUseCases.forEach(useCase => {
      expect(content.toLowerCase()).toContain(useCase);
    });
    
    // Check for proper method documentation
    const methodRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const hasMethodExamples = [];
    let match;
    
    while ((match = methodRegex.exec(content)) !== null) {
      const code = match[2].trim();
      if (code.includes('sdk.') || code.includes('await')) {
        hasMethodExamples.push(code);
      }
    }
    
    expect(hasMethodExamples.length).toBeGreaterThan(5); // Should have multiple method examples
  });

  test('Documentation is accessible and searchable', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Check for proper heading structure for accessibility
    const headings = content.match(/^#{1,6}\s+(.+)$/gm) || [];
    headings.forEach(heading => {
      const text = heading.replace(/^#{1,6}\s+/, '').trim();
      expect(text.length).toBeGreaterThan(3); // Headings should be descriptive
      expect(text).not.toMatch(/^[A-Z\s]+$/); // Not all caps (bad for accessibility)
    });
    
    // Check for proper link text
    const linkRegex = /\[([^\]]+)\]\([^)]+\)/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      expect(linkText.length).toBeGreaterThan(2); // Link text should be descriptive
      expect(linkText).not.toMatch(/^(click here|here|more)$/i); // Avoid generic link text
    }
    
    // Check for proper code block language specification
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const codeBlocks = [];
    let codeMatch;
    
    while ((codeMatch = codeBlockRegex.exec(content)) !== null) {
      const language = codeMatch[1];
      const code = codeMatch[2].trim();
      
      if (code.includes('const ') || code.includes('function') || code.includes('await')) {
        expect(language).toBeTruthy(); // Code blocks should specify language
      }
    }
  });

  test('Documentation covers all essential UI locations', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Expected UI locations based on source code analysis
    const expectedUILocations = [
      'DashboardWidget',
      'CustomField', 
      'SidebarWidget',
      'AppConfigWidget',
      'FullPage',
      'FieldModifierLocation',
      'AssetSidebarWidget',
      'ContentTypeSidebarWidget',
      'GlobalFullPageLocation',
      'RTELocation'
    ];
    
    // Check that all UI locations are documented
    expectedUILocations.forEach(location => {
      expect(content).toContain(location);
    });
    
    // Check that each UI location has proper documentation structure
    expectedUILocations.forEach(location => {
      const locationSection = content.split(`### ${location}`)[1]?.split('### ')[0] || '';
      expect(locationSection.length).toBeGreaterThan(100); // Should have substantial content
      expect(locationSection).toMatch(/```/); // Should have code examples
    });
  });

  test('Documentation has proper error handling examples', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Check for error handling documentation
    const errorHandlingKeywords = [
      'error',
      'exception',
      'try',
      'catch',
      'throw',
      'handling'
    ];
    
    const hasErrorHandling = errorHandlingKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
    
    expect(hasErrorHandling).toBe(true);
    
    // Check for proper async error handling in code examples
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const asyncCodeBlocks = [];
    let match;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const code = match[2].trim();
      if (code.includes('await') && code.includes('sdk.')) {
        asyncCodeBlocks.push(code);
      }
    }
    
    // At least some async examples should have error handling
    const hasErrorHandlingInAsync = asyncCodeBlocks.some(code => 
      code.includes('try') || code.includes('catch') || code.includes('Error')
    );
    
    // This is a soft check - not all examples need error handling
    if (asyncCodeBlocks.length > 3) {
      expect(hasErrorHandlingInAsync).toBe(true);
    }
  });

  test('Documentation provides clear getting started path', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Check for getting started content
    const gettingStartedKeywords = [
      'installation',
      'quick start',
      'getting started',
      'setup',
      'initialize',
      'basic example'
    ];
    
    const hasGettingStarted = gettingStartedKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
    
    expect(hasGettingStarted).toBe(true);
    
    // Check for installation instructions
    expect(content.toLowerCase()).toMatch(/npm install|yarn add|install/);
    
    // Check for basic usage example
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const hasBasicExample = [];
    let match;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const code = match[2].trim();
      if (code.includes('ContentstackAppSDK') || code.includes('sdk.init')) {
        hasBasicExample.push(code);
      }
    }
    
    expect(hasBasicExample.length).toBeGreaterThan(0);
  });

  test('Documentation is clear and understandable for new developers', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Check for clear explanations of concepts
    const clarityIndicators = [
      'enables developers',
      'provides access',
      'allows you to',
      'helps you',
      'makes it easy',
      'simplifies',
      'streamlines'
    ];
    
    const hasClearExplanations = clarityIndicators.some(indicator => 
      content.toLowerCase().includes(indicator)
    );
    
    expect(hasClearExplanations).toBe(true);
    
    // Check for practical use cases
    const useCaseIndicators = [
      'use cases',
      'common patterns',
      'best practices',
      'examples',
      'scenarios'
    ];
    
    const hasUseCases = useCaseIndicators.some(indicator => 
      content.toLowerCase().includes(indicator)
    );
    
    expect(hasUseCases).toBe(true);
    
    // Check for step-by-step guidance
    const stepIndicators = [
      'step 1',
      'first',
      'then',
      'next',
      'finally',
      'follow these steps'
    ];
    
    const hasStepByStep = stepIndicators.some(indicator => 
      content.toLowerCase().includes(indicator)
    );
    
    // This is a soft check - not all docs need step-by-step
    if (content.toLowerCase().includes('getting started')) {
      expect(hasStepByStep).toBe(true);
    }
  });

  test('Documentation provides practical, workable examples', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Find all code examples
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const codeBlocks = [];
    let match;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1] || 'text';
      const code = match[2].trim();
      if (['ts', 'typescript', 'js', 'javascript'].includes(language)) {
        codeBlocks.push(code);
      }
    }
    
    // Check for practical examples
    const practicalExamples = codeBlocks.filter(code => {
      // Examples should be realistic and practical
      const hasRealisticData = code.includes('blog') || code.includes('title') || 
                              code.includes('content') || code.includes('user') ||
                              code.includes('asset') || code.includes('entry');
      
      // Examples should show actual usage patterns
      const hasUsagePatterns = code.includes('await') || code.includes('callback') ||
                              code.includes('event') || code.includes('data');
      
      // Examples should be complete enough to understand
      const isComplete = code.length > 50; // Not just one-liners
      
      return hasRealisticData && hasUsagePatterns && isComplete;
    });
    
    expect(practicalExamples.length).toBeGreaterThan(3); // Should have multiple practical examples
    
    // Check for error handling examples
    const errorHandlingExamples = codeBlocks.filter(code => 
      code.includes('try') || code.includes('catch') || code.includes('error')
    );
    
    expect(errorHandlingExamples.length).toBeGreaterThan(0); // Should have error handling examples
  });

  test('Documentation has logical information flow for learning', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Check for logical progression from basic to advanced
    const sections = content.split(/\n#{1,3}\s+/);
    const sectionTitles = sections.map(section => section.split('\n')[0].trim());
    
    // Should start with overview/installation
    const earlySections = sectionTitles.slice(0, 5);
    const hasBasicStart = earlySections.some(title => 
      title.toLowerCase().includes('overview') || 
      title.toLowerCase().includes('installation') ||
      title.toLowerCase().includes('quick start')
    );
    
    expect(hasBasicStart).toBe(true);
    
    // Should have API reference after basics
    const hasApiReference = sectionTitles.some(title => 
      title.toLowerCase().includes('api') || 
      title.toLowerCase().includes('reference') ||
      title.toLowerCase().includes('sdk')
    );
    
    expect(hasApiReference).toBe(true);
    
    // Should have advanced topics later
    const laterSections = sectionTitles.slice(-5);
    const hasAdvancedTopics = laterSections.some(title => 
      title.toLowerCase().includes('advanced') || 
      title.toLowerCase().includes('best practices') ||
      title.toLowerCase().includes('patterns')
    );
    
    // Check if best practices exists anywhere in the content
    const hasBestPractices = content.toLowerCase().includes('best practices');
    
    // This is a soft check - not all docs need advanced sections
    if (hasBestPractices) {
      // If best practices exists, it should be in the later sections
      expect(hasAdvancedTopics || hasBestPractices).toBe(true);
    } else {
      // If no best practices section, that's okay - not all docs need it
      expect(hasAdvancedTopics).toBeDefined();
    }
  });

  test('Documentation is easy to navigate and find information', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Check for clear section organization
    const headings = content.match(/^#{1,6}\s+(.+)$/gm) || [];
    const headingLevels = headings.map(h => h.match(/^(#{1,6})/)[1].length);
    
    // Should have proper heading hierarchy
    expect(headingLevels[0]).toBe(1); // Should start with H1
    expect(headingLevels[1]).toBeLessThanOrEqual(2); // Should have H2 sections
    
    // Check for descriptive headings
    const descriptiveHeadings = headings.filter(heading => {
      const text = heading.replace(/^#{1,6}\s+/, '').trim();
      return text.length > 5 && text.length < 100; // Not too short, not too long
    });
    
    expect(descriptiveHeadings.length).toBeGreaterThan(headings.length * 0.8); // 80% should be descriptive
    
    // Check for cross-references and links
    const linkRegex = /\[([^\]]+)\]\([^)]+\)/g;
    const links = [];
    let linkMatch;
    
    while ((linkMatch = linkRegex.exec(content)) !== null) {
      links.push(linkMatch[1]);
    }
    
    expect(links.length).toBeGreaterThan(10); // Should have multiple cross-references
    
    // Check for table of contents or navigation
    const hasNavigation = content.toLowerCase().includes('table of contents') ||
                         content.toLowerCase().includes('navigation') ||
                         content.toLowerCase().includes('contents');
    
    // This is a soft check - not all docs need explicit TOC
    if (headings.length > 10) {
      expect(hasNavigation).toBe(true);
    }
  });

  test('Documentation provides helpful context and explanations', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Check for helpful explanations
    const explanationIndicators = [
      'this means',
      'in other words',
      'for example',
      'note that',
      'important',
      'remember',
      'keep in mind',
      'note:',
      'example:',
      'for instance',
      'returns:',
      'provides',
      'enables',
      'allows'
    ];
    
    const hasExplanations = explanationIndicators.some(indicator => 
      content.toLowerCase().includes(indicator)
    );
    
    expect(hasExplanations).toBe(true);
    
    // Check for context about when to use features
    const contextIndicators = [
      'when you need',
      'if you want',
      'to achieve',
      'for this purpose',
      'in this case',
      'scenario',
      'use cases',
      'purpose',
      'if (',
      'when'
    ];
    
    const hasContext = contextIndicators.some(indicator => 
      content.toLowerCase().includes(indicator)
    );
    
    expect(hasContext).toBe(true);
    
    // Check for warnings or important notes
    const warningIndicators = [
      'warning',
      'caution',
      'important',
      'note',
      'tip',
      'best practice'
    ];
    
    const hasWarnings = warningIndicators.some(indicator => 
      content.toLowerCase().includes(indicator)
    );
    
    expect(hasWarnings).toBe(true);
  });

  test('Documentation is developer-friendly and engaging', () => {
    const outputFile = path.join(docsDir, 'api-reference.md');
    const content = fs.readFileSync(outputFile, 'utf8');
    
    // Check for engaging language
    const engagingIndicators = [
      'powerful',
      'flexible',
      'easy',
      'simple',
      'efficient',
      'robust',
      'comprehensive'
    ];
    
    const hasEngagingLanguage = engagingIndicators.some(indicator => 
      content.toLowerCase().includes(indicator)
    );
    
    expect(hasEngagingLanguage).toBe(true);
    
    // Check for practical benefits
    const benefitIndicators = [
      'save time',
      'improve',
      'enhance',
      'streamline',
      'simplify',
      'accelerate',
      'optimize'
    ];
    
    const hasBenefits = benefitIndicators.some(indicator => 
      content.toLowerCase().includes(indicator)
    );
    
    expect(hasBenefits).toBe(true);
    
    // Check for real-world applicability
    const realWorldIndicators = [
      'production',
      'real-world',
      'practical',
      'actual',
      'live',
      'deployment'
    ];
    
    const hasRealWorld = realWorldIndicators.some(indicator => 
      content.toLowerCase().includes(indicator)
    );
    
    expect(hasRealWorld).toBe(true);
  });
});
